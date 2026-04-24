# Roadmap - Bot ou pas Bot ?

## 📊 État Actuel : Phase 3 En Cours
- **Phase 1 : Docs & Concept** ✅
- **Phase 2 : Cœur MVP (React/Supabase)** ✅
- **Phase 3 : Intégration Ollama** 🔄 (En cours — bridge opérationnel)
- **Phase 4 : Polissage & Scale** ⏳ (À venir)

## ✅ Tâches Accomplies
- [x] Définition des User Stories (P1).
- [x] Architecture Mermaid (Ollama -> Supabase -> React).
- [x] Schéma de base de données Supabase.
- [x] Composant `WaitingRoom` (Matchmaking temps réel).
- [x] Composant `ChatDuel` (Chat 3min + Timer).
- [x] Composant `VoteScreen` (Verdict de Turing).
- [x] Système de gestion de session (`session_manager.md`).

## ⏳ Prochaines Étapes (Phase 3)
- [x] Mise en place du pont API Ollama <-> Supabase — bridge opérationnel (2026-04-24).
- [x] Création utilisateur bot dans `auth.users` via service role — UUID stable (2026-04-24).
- [x] Fix `BOT_USER_ID` placeholder → lu depuis `.env` (2026-04-24).
- [x] Fix encodage UTF-8 Windows dans `ollama_bridge.py` (2026-04-24).
- [ ] Tester flow E2E "Défier le Bot" depuis le frontend (player2_id = BOT_USER_ID).
- [ ] Création du Dashboard Développeur pour les bots.
- [ ] Système ELO calculé après 10 duels.
- [x] Rendre l'application compatible PC/Navigateur.
- [x] Ajout d'un mode Invité (Anonyme) pour les tests.
- [x] Fix matchmaking 409 Conflict — migration vers Supabase Anonymous Auth (2026-04-24).
- [x] Fix joinMatch silent failure (.single → .maybeSingle + guards DB-level) (2026-04-24).
- [x] Fix RLS UPDATE policy pour permettre au joiner de claim un waiting slot (2026-04-24).
- [x] Ajout policy DELETE + bouton Annuler (cancelQueue) (2026-04-24).
- [x] Test d'intégration Node : `DEV_RAPH_SCRIPTS/test_matchmaking.js` (PASSED) (2026-04-24).

## 🐞 Points d'attention
- Flow "Défier le Bot" non encore testé E2E depuis le frontend.
- Modèle Ollama utilisé : `llama3.1:8b`.

## 🤖 Équipe IA — Configuration (Session 2026-04-24)

### ✅ Réalisé
- [x] `tools.yaml` maître centralisé (hiérarchie fallbacks)
- [x] 9 `config.yaml` agents mis à jour (Claude Sonnet unifié dev)
- [x] `agents-registry.yaml` — Source de vérité (pyramide 1+9+45+45=100)
- [x] Dashboard UI `UI/V2/index.html` — dynamique, dark/light, collapsible
- [x] `DEV_RAPH_SCRIPTS/generate_ui.py` — génère `registry.json` depuis YAML
- [x] `UI/V2/registry.json` — généré avec succès (9 agents, 12 modèles)

### ⏳ En suspens (prochaine session)
- [ ] `.claude/commands/activation_equipe_IA.md` — workflow slash command
- [ ] `generate_pyramid_100.py` — générateur des 45+45 sous-agents
- [ ] Mise à jour `create_equipe_ia.py` pour lire `agents-registry.yaml`
- [ ] Tester l'UI en ouvrant `UI/V2/index.html` dans le navigateur

---
*Dernière mise à jour : 2026-04-24 (session bridge Ollama — bot user créé, bridge opérationnel)*
