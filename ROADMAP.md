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
- [x] Outil **AutoAntigravity** : Clicker, Capture DPI-aware, Statistiques et Overlay dynamique (2026-04-25).
- [x] **Logs IA en temps réel** : Affichage des étapes de réflexion d'Ollama directement dans l'interface de chat (2026-04-25).
- [x] **Optimiseur de Prompts IA** : Interface premium pour transformer des idées simples en prompts structurés (2026-04-26).
- [x] **Standardisation Ollama** : Utilisation de `gemma3:4b` comme modèle unique via `config.py` (2026-04-26).
- [x] **Préchargement Intelligent** : Mise en cache du modèle LLM dès le démarrage du launcher (2026-04-26).

## ⏳ Prochaines Étapes (Phase 3)
- [/] **Sélecteur de Cible IA dans l'Optimiseur de Prompts** : Plan complet rédigé (`PLAN_EN_COURS.md`), implémentation en attente (2026-04-26).
- [ ] Tester flow E2E "Défier le Bot" depuis le frontend (player2_id = BOT_USER_ID).
- [x] Création du Dashboard Développeur pour les bots (intégré au Launcher Web) (2026-04-26).
- [ ] Système ELO calculé après 10 duels.
- [ ] Fenêtre d'analyse graphique des clics pour AutoAntigravity.
- [x] Rendre l'application compatible PC/Navigateur.
- [x] Ajout d'un mode Invité (Anonyme) pour les tests.
- [x] Fix matchmaking 409 Conflict — migration vers Supabase Anonymous Auth (2026-04-24).
- [x] Fix joinMatch silent failure (.single → .maybeSingle + guards DB-level) (2026-04-24).
- [x] Fix RLS UPDATE policy pour permettre au joiner de claim un waiting slot (2026-04-24).
- [x] Ajout policy DELETE + bouton Annuler (cancelQueue) (2026-04-24).
- [x] Test d'intégration Node : `SCRIPTS/test_matchmaking.js` (PASSED) (2026-04-24).

## 🐞 Points d'attention
- **Design en attente** : Les tâches de design (Dezy/Mobi) sont en pause jusqu'à réception des maquettes de Claude Design.
- **Focus actuel** : Développement des fonctionnalités "autres" (Matchmaking, Bot, Backend).
- Flow "Défier le Bot" non encore testé E2E depuis le frontend.
- Modèle Ollama utilisé : `gemma3:4b` (Standardisé).
- L'overlay AutoAntigravity utilise désormais Rouge=Actif / Vert=Inactif selon préférence utilisateur.

## 🤖 Équipe IA — Configuration (Session 2026-04-24)

### ✅ Réalisé
- [x] `tools.yaml` maître centralisé (hiérarchie fallbacks)
- [x] 9 `config.yaml` agents mis à jour (Claude Sonnet unifié dev)
- [x] `agents-registry.yaml` — Source de vérité (pyramide 1+9+45+45=100)
- [x] Dashboard UI `UI/V2/index.html` — dynamique, dark/light, collapsible
- [x] `SCRIPTS/generate_ui.py` — génère `registry.json` depuis YAML
- [x] `UI/V2/registry.json` — généré avec succès (9 agents, 12 modèles)
- [x] **`ROADMAP_EQUIPE_IA.md`** — Roadmap stratégique 5 phases (P0-P4), 19 tâches déléguées aux agents spécialisés, système de suivi (2026-04-24).
- [x] **Phase 0 Complétée** : Tests & Fixtures (Quali), Templates (Scribe), CI/CD Pipeline (Fullo) (2026-04-25).
- [x] **Phase 1 Complétée** : Pyramide de 100 agents générée, configurée et testée (Archi, Fullo, Quali, Scribe) (2026-04-25).
- [x] **Intégration Workflow** : Commandes `/start` et `/close` synchronisées avec la pyramide 100 IA (ChefIA) (2026-04-25).

- [/] **Phase 2 (MVP Duel)** : Lancement du design UI mobile et flow d'invitation.
- [x] `.claude/commands/activation_equipe_IA.md` — workflow intégré à startV3.md (2026-04-26).

📚 **Roadmap détaillée:** voir [`ROADMAP_EQUIPE_IA.md`](../ROADMAP_EQUIPE_IA.md) à la racine pour le plan complet des 5 phases, tâches par agent, et processus de clôture.

---
*Dernière mise à jour : 2026-04-26 (Plan Sélecteur Cible IA pour l'Optimiseur de Prompts)*
