import os
import time
import json
import ollama
from supabase import create_client, Client
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY") # On utilisera la clé service role si possible, sinon anon

# ID du Bot (à configurer ou à récupérer via la DB)
# Pour le test, on peut imaginer un ID fixe ou chercher un utilisateur nommé "Bot"
BOT_USER_ID = "00000000-0000-0000-0000-000000000000" # Placeholder

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Erreur: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY manquants dans le .env")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_bot_response(history):
    """Interroge Ollama avec l'historique du chat"""
    prompt = "Tu es un humain participant à un test de Turing anonyme. Réponds de manière courte, naturelle, avec quelques fautes de frappe occasionnelles, comme si tu tapais sur un téléphone. Ne dis JAMAIS que tu es une IA.\n\n"
    
    messages = [{"role": "system", "content": prompt}]
    for msg in history:
        role = "assistant" if msg['user_id'] == BOT_USER_ID else "user"
        messages.append({"role": role, "content": msg['text']})
    
    response = ollama.chat(model='llama3.1:8b', messages=messages)
    return response['message']['content']

def handle_new_match(payload):
    """Traitement d'un nouveau match créé"""
    new_match = payload.get('record')
    if new_match:
        p1 = new_match.get('player1_id')
        p2 = new_match.get('player2_id')
        print(f"\n✨ [MATCH] Nouveau match détecté ! (ID: {new_match.get('id')})")
        print(f"   👤 Joueur 1: {p1}")
        print(f"   🤖 Joueur 2: {p2}")

def handle_new_message(payload):
    """Traitement d'un nouveau message inséré"""
    new_record = payload.get('record')
    if not new_record:
        return

    match_id = new_record.get('match_id')
    user_id = new_record.get('user_id')
    text = new_record.get('text')
    is_human = new_record.get('is_human', True)

    prefix = "👤 [HUMAIN]" if is_human else "🤖 [BOT]"
    print(f"{prefix} Match {match_id[:8]}: {text}")

    # Si c'est un message humain dans un match impliquant le bot
    if user_id != BOT_USER_ID and is_human:
        # Vérifier si le bot est dans ce match
        match_data = supabase.table("matches").select("*").eq("id", match_id).single().execute()
        match = match_data.data
        
        if match and (match['player1_id'] == BOT_USER_ID or match['player2_id'] == BOT_USER_ID):
            # Récupérer l'historique
            history_data = supabase.table("messages").select("*").eq("match_id", match_id).order("created_at").execute()
            history = history_data.data
            
            print("   💭 Le bot réfléchit...")
            bot_reply = get_bot_response(history)
            
            # Insérer la réponse du bot
            supabase.table("messages").insert({
                "match_id": match_id,
                "user_id": BOT_USER_ID,
                "text": bot_reply,
                "is_human": False
            }).execute()

def main():
    print("\n" + "="*50)
    print("🚀 BRIDGE OLLAMA <-> SUPABASE OPÉRATIONNEL")
    print("="*50)
    print("📺 Surveillance en temps réel du terminal activée...\n")
    
    last_msg_id = None
    last_match_id = None
    
    while True:
        try:
            # Check for new matches
            match_query = supabase.table("matches").select("*").order("created_at", desc=True).limit(1).execute()
            if match_query.data:
                latest_match = match_query.data[0]
                if latest_match['id'] != last_match_id:
                    handle_new_match({'record': latest_match})
                    last_match_id = latest_match['id']

            # Check for new messages
            msg_query = supabase.table("messages").select("*").order("created_at", desc=True).limit(1).execute()
            if msg_query.data:
                latest_msg = msg_query.data[0]
                if latest_msg['id'] != last_msg_id:
                    handle_new_message({'record': latest_msg})
                    last_msg_id = latest_msg['id']

        except Exception as e:
            # Silently retry for MVP stability
            pass
            
        time.sleep(1) # Polling rapide (1s)

if __name__ == "__main__":
    main()
