import os
import sys
import json
import argparse
from supabase import create_client, Client
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Erreur: SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquants")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def log_agent_activity(agent_id, event, details, match_id=None):
    """Enregistre une activité d'agent dans Supabase et en local JSON"""
    timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    new_log = {
        "agent_id": agent_id,
        "event": event,
        "details": details,
        "created_at": timestamp
    }
    if match_id:
        new_log["match_id"] = match_id

    # 1. Tentative Supabase
    try:
        supabase.table("system_logs").insert(new_log).execute()
        print(f"[OK] Log envoye a Supabase ({agent_id})")
    except Exception as e:
        print(f"[INFO] Supabase indisponible (Table system_logs manquante ?)")

    # 2. Sauvegarde Locale (Fallback robuste)
    try:
        log_file = "UI/V2/activity_stream.json"
        logs = []
        if os.path.exists(log_file):
            with open(log_file, "r", encoding="utf-8") as f:
                logs = json.load(f)
        
        logs.append(new_log)
        # Garder les 100 derniers logs
        logs = logs[-100:]
        
        with open(log_file, "w", encoding="utf-8") as f:
            json.dump(logs, f, indent=2, ensure_ascii=False)
        print(f"[OK] Log sauvegarde localement dans {log_file}")
    except Exception as e:
        print(f"[ERREUR] Sauvegarde locale: {e}")

if __name__ == "__main__":
    import time
    parser = argparse.ArgumentParser(description="Logger pour l'Équipe IA 100")
    parser.add_argument("--agent", required=True, help="ID de l'agent (ex: ChefIA, Archi)")
    parser.add_argument("--event", required=True, help="Type d'événement (ex: DISPATCH, ANALYSE)")
    parser.add_argument("--details", required=True, help="Détails de l'action")
    parser.add_argument("--match", help="ID du match optionnel")
    
    args = parser.parse_args()
    log_agent_activity(args.agent, args.event, args.details, args.match)
