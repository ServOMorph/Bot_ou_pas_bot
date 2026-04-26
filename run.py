import http.server
import socketserver
import webbrowser
import threading
import os
import time
import subprocess
import sys
import json
from urllib.parse import urlparse, parse_qs
from pathlib import Path

PORT = 8000
LAUNCHER_PATH = "UI/launcher.html"
DASHBOARD_PATH = "UI/V2/index.html"

# État global des processus
services = {
    "game": {"name": "Vite (Jeu)", "cmd": "npm run dev", "proc": None, "url": "http://localhost:5173"},
    "dashboard": {"name": "Dashboard IA", "cmd": None, "proc": None, "url": f"http://localhost:{PORT}/{DASHBOARD_PATH}"},
    "stats": {"name": "Tableau de Bord", "cmd": None, "proc": None, "url": f"http://localhost:{PORT}/UI/dashboard.html"},
    "bridge": {"name": "Bridge Ollama", "cmd": f"{sys.executable} SCRIPTS/ollama_bridge.py", "proc": None, "url": None}
}

class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    """Serveur HTTP capable de gérer plusieurs requêtes en parallèle"""
    daemon_threads = True
    allow_reuse_address = True

class LauncherAPIHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        # On logue uniquement les erreurs ou les API calls importants
        if "/api/" in args[0]:
            print(f"📡 API: {args[0]}")

    def do_GET(self):
        parsed_url = urlparse(self.path)
        
        # Route API : Launch
        if parsed_url.path == '/api/launch':
            query = parse_qs(parsed_url.query)
            service_id = query.get('service', [None])[0]
            
            print(f"📥 Requête de lancement reçue pour : {service_id}")
            success = False
            if service_id == 'all':
                self.launch_service('game')
                self.launch_service('bridge')
                self.launch_service('dashboard')
                success = True
            elif service_id in services:
                success = self.launch_service(service_id)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success" if success else "error"}).encode())
            return

        # Route API : Status
        if parsed_url.path == '/api/status':
            status = {s_id: (s_data["proc"] is not None) for s_id, s_data in services.items()}
            # Le dashboard est considéré online si le serveur tourne (donc toujours ici)
            status["dashboard"] = True 
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(status).encode())
            return

        # Route API : Structure
        if parsed_url.path == '/api/structure':
            structure = self.get_project_structure(".")
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(structure).encode())
            return

        # Par défaut, servir les fichiers statiques
        if self.path == '/':
            self.path = LAUNCHER_PATH
            
        return super().do_GET()

    def get_project_structure(self, root_path):
        """Scanne le projet pour générer une arborescence JSON"""
        tree = {"name": "Bot ou pas Bot ?", "type": "directory", "children": [], "path": "root"}
        exclude_dirs = {'.git', 'node_modules', 'dist', 'coverage', '__pycache__', '.claude'}
        
        path_obj = Path(root_path)
        
        def build_tree(current_path, current_node):
            try:
                # Trier pour avoir les dossiers en premier, puis fichiers
                entries = sorted(list(current_path.iterdir()), key=lambda x: (not x.is_dir(), x.name.lower()))
                
                for entry in entries:
                    if entry.name in exclude_dirs:
                        continue
                        
                    node = {
                        "name": entry.name,
                        "type": "directory" if entry.is_dir() else "file",
                        "path": str(entry.relative_to(root_path)).replace("\\", "/")
                    }
                    
                    if entry.is_dir():
                        node["children"] = []
                        # On limite la profondeur pour certains dossiers si besoin, 
                        # mais ici on descend partout sauf exclus
                        build_tree(entry, node)
                    
                    current_node["children"].append(node)
            except Exception as e:
                print(f"Erreur scan {current_path}: {e}")

        build_tree(path_obj, tree)
        return tree

    def launch_service(self, service_id):
        service = services.get(service_id)
        if not service:
            return False
            
        # Si le service a une URL, on l'ouvre systématiquement (pour permettre de ré-ouvrir l'onglet)
        if service["url"]:
            print(f"🌐 Ouverture/Réouverture : {service['url']}")
            # On utilise un délai court pour laisser le temps au processus de démarrer si besoin
            delay = 2.0 if service["proc"] is None and service["cmd"] else 0.1
            threading.Timer(delay, lambda: webbrowser.open(service["url"])).start()

        # Si le processus tourne déjà, on ne fait rien de plus
        if service["proc"] is not None:
            print(f"ℹ️ {service['name']} est déjà en cours d'exécution.")
            return True

        # Lancement du processus
        if service["cmd"]:
            print(f"🚀 Lancement de {service['name']}...")
            try:
                # Utiliser shell=True pour npm et les commandes complexes
                p = subprocess.Popen(service["cmd"], shell=True)
                service["proc"] = p
                return True
            except Exception as e:
                print(f"❌ Erreur lors du lancement de {service_id}: {e}")
                return False
        
        # Cas particulier du dashboard qui n'a pas de cmd propre (interne au serveur)
        if service_id == "dashboard":
            service["proc"] = "internal"
            return True

        return True

def log_activity(agent, event, details):
    try:
        subprocess.run([
            sys.executable, "SCRIPTS/agent_logger.py",
            "--agent", agent,
            "--event", event,
            "--details", details
        ], capture_output=True)
    except Exception:
        pass

def cleanup():
    print("\n⚠️ Arrêt des services...")
    for s_id, s_data in services.items():
        if s_data["proc"] and s_data["proc"] != "internal":
            try:
                print(f"Arrêt de {s_data['name']}...")
                # Sur Windows, terminate() ne tue pas les enfants de shell=True
                if sys.platform == "win32":
                    subprocess.run(["taskkill", "/F", "/T", "/PID", str(s_data["proc"].pid)], capture_output=True)
                else:
                    s_data["proc"].terminate()
            except:
                pass
    print("✅ Nettoyage terminé.")

if __name__ == "__main__":
    # Correction encodage Windows
    if sys.platform == "win32":
        import ctypes
        kernel32 = ctypes.windll.kernel32
        kernel32.SetConsoleMode(kernel32.GetStdHandle(-11), 7)

    # Sync registry
    try:
        subprocess.run([sys.executable, "SCRIPTS/generate_ui.py"], capture_output=True)
    except:
        pass

    print("\n" + "="*50)
    print("🤖 BOT OU PAS BOT - SERVEUR D'ORCHESTRATION")
    print("="*50)
    print(f"Launcher : http://localhost:{PORT}")
    print("Appuyez sur CTRL+C pour tout arrêter.")
    print("="*50 + "\n")

    handler = LauncherAPIHandler
    handler.extensions_map.update({'.json': 'application/json'})
    
    with ThreadedTCPServer(("", PORT), handler) as httpd:
        log_activity("ChefIA", "ORCHESTRATOR_START", "Serveur Web Launcher demarre (Threaded)")
        webbrowser.open(f"http://localhost:{PORT}")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            cleanup()
            log_activity("ChefIA", "SHUTDOWN", "Arret manuel de l'orchestrateur")
            sys.exit(0)
