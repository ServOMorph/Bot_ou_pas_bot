"""
Script one-time : crée l'utilisateur bot dans auth.users via service role.
Lance une seule fois, copie le BOT_USER_ID affiché dans ton .env.
"""
import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SERVICE_ROLE_KEY:
    print("❌ VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquants dans .env")
    exit(1)

supabase = create_client(SUPABASE_URL, SERVICE_ROLE_KEY)

BOT_EMAIL = "bot@botoupasbot.local"

# Vérifie si le bot existe déjà
existing = supabase.auth.admin.list_users()
for user in existing:
    if hasattr(user, 'email') and user.email == BOT_EMAIL:
        print(f"✅ Bot déjà existant — BOT_USER_ID={user.id}")
        print(f"\nAjoute dans ton .env :\nBOT_USER_ID={user.id}")
        exit(0)

# Création du bot
response = supabase.auth.admin.create_user({
    "email": BOT_EMAIL,
    "email_confirm": True,
    "user_metadata": {"role": "bot", "display_name": "Bot Ollama"}
})

bot_id = response.user.id
print(f"✅ Utilisateur bot créé — BOT_USER_ID={bot_id}")
print(f"\nAjoute dans ton .env :\nBOT_USER_ID={bot_id}")
