import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("VITE_SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase: Client = create_client(url, key)

sql = """
CREATE TABLE IF NOT EXISTS public.system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
    agent_id TEXT,
    event TEXT,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Logs are visible to everyone" ON public.system_logs;
CREATE POLICY "Logs are visible to everyone" ON public.system_logs FOR SELECT USING (true);
ALTER PUBLICATION supabase_realtime ADD TABLE public.system_logs;
"""

print("🚀 Tentative de création de la table system_logs...")
try:
    # On utilise rpc ou une exécution directe si possible, 
    # mais Supabase Python Client n'a pas de .query() direct pour le DDL.
    # On va passer par l'API REST si configurée ou simplement informer l'utilisateur.
    # Note: On peut essayer d'insérer un log bidon pour voir si la table existe.
    res = supabase.table("system_logs").select("*").limit(1).execute()
    print("✅ La table existe déjà.")
except Exception as e:
    print(f"❌ La table n'existe probablement pas ou erreur: {e}")
    print("ℹ️ Veuillez exécuter le SQL suivant dans le dashboard Supabase:")
    print(sql)
