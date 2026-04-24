# Bot ou pas Bot ? - Session 2026-04-24 (Debug Matchmaking)

**Statut** : Matchmaking humain fonctionnel.

## 🚀 Accomplissements
- **Fix 409 Conflict** : Migration du Mode Invite vers `supabase.auth.signInAnonymously()` (vrai user dans auth.users au lieu de fake UUID).
- **Fix joinMatch silent failure** : `.single()` -> `.maybeSingle()` + destructuring error + guards DB-level (`.eq('status','waiting').is('player2_id',null)`) contre race conditions.
- **Fix RLS UPDATE** : policy etendue pour autoriser le joiner (User B) a claim un waiting slot (`player2_id IS NULL`).
- **Cancel button** : nouvelle fonction `cancelQueue` + policy DELETE + bouton UI (accent #ff8c42).
- **Test d'integration** : `DEV_RAPH_SCRIPTS/test_matchmaking.js` cree et PASSED.
- **Logs diagnostic** : subscription status, SELECT result, INSERT/UPDATE realtime events.
- **Ollama bridge** : modele corrige `llama3` -> `llama3.1:8b`.
- **RUN_COMMANDS.md** : cree a la racine pour reference rapide.

## ⚠️ En suspens (prochaine session)
- **BOT_USER_ID** : `00000000-...` n'existe pas dans `auth.users` -> FK violation sur messages. Solution : creer un vrai compte bot via service role key OU retirer la FK pour MVP.
- **Dashboard Developpeur** pour les bots.
- **Systeme ELO** calcule apres 10 duels.
- **Generateur pyramide 100 agents** (45+45 sous-agents).

## 📚 Apprentissages stockes
- **Local memory** : `feedback_testing_multi_user.md` (tester avec 2 navigateurs distincts).
- **Systeme centralise** : `LRN-20260424215858-0330` [supabase, anonymous-auth, testing, localStorage].

## 🐞 Gotcha
**Tester avec 2 onglets du meme navigateur ne fonctionne PAS** : Supabase Anonymous Auth partage la session via localStorage. Utiliser 2 navigateurs differents (Chrome+Firefox) ou onglet prive.

## 🛠️ Fichiers modifies
- `src/App.jsx` (loginAsGuest)
- `src/components/WaitingRoom.jsx` (joinMatch + startQueue + cancelQueue + UI + logs)
- `supabase.sql` (policies UPDATE + DELETE)
- `DEV_RAPH_SCRIPTS/ollama_bridge.py` (llama3.1:8b)
- `DEV_RAPH_SCRIPTS/test_matchmaking.js` (nouveau)
- `RUN_COMMANDS.md` (nouveau)
- `docs/ROADMAP.md` (statut update)
- `README.md` (tests + gotcha)
