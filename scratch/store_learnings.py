import subprocess
import json

manager_path = r"C:\Users\raph6\Documents\ServOMorph\Agents_IA_V2\.claude\learnings\learning_manager.py"

learnings = [
    {
        "context": "Gestion des ports orphelins sur Windows lors du redemarrage du serveur Python",
        "error_pattern": "Plusieurs instances de run.py en LISTENING sur le port 8000 bloquent les requetes sans erreur explicite.",
        "solution": "Identifier les PID via netstat -ano et les tuer via taskkill /F /PID.",
        "project_source": "Bot ou pas Bot",
        "confidence": 0.9
    },
    {
        "context": "Parsing JSON sur une route API manquante (404)",
        "error_pattern": "r.json() echoue car le serveur HTTP par defaut renvoie une page d erreur HTML.",
        "solution": "S assurer que la route API est definie ou verifier le status de la reponse avant de parser.",
        "project_source": "Bot ou pas Bot",
        "confidence": 0.9
    }
]

for l in learnings:
    cmd = [ "python", manager_path, "store", json.dumps(l) ]
    subprocess.run(cmd)

subprocess.run(["python", manager_path, "promote"])
