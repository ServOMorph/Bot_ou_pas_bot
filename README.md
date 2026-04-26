# 🤖 Bot ou pas Bot ?

Arène de Turing moderne : duels anonymes chat IA-humain (18-35 ans).

## 🚀 État du Projet : MVP Phase 3 (En cours)
- [x] Système de gestion de session (`session_manager.md`).
- [x] Outil d'automatisation **AutoAntigravity** (Clicker + Capture de zone) (2026-04-25).
- [x] **Orchestrateur Web Centralisé** (2026-04-26).
Le système de duel est opérationnel. Le pont Ollama est **opérationnel** — le bridge détecte les matchs et messages en temps réel. Le flow E2E "Défier le Bot" est la prochaine étape.

## 🛠 Stack Technique
- **Frontend** : React (Vite) + Vanilla CSS (Dark Mode Premium).
- **Backend** : Supabase (Auth, DB, Realtime).
- **IA** : Ollama (Intégration prévue en Phase 3).
- **Orchestration** : Python (API Server + Web Launcher).

## 📦 Installation & Lancement Rapide
```bash
# 1. Cloner et Installer
git clone https://github.com/votre-repo/bot-ou-pas-bot.git
cd bot-ou-pas-bot
npm install

# 2. Configurer Supabase
# Copier .env.example vers .env et remplir les clés

# 3. LANCEMENT UNIQUE (Nouveau !)
python run.py
```
L'exécution de `python run.py` ouvre un **Launcher Web** permettant d'activer en un clic :
- Le Frontend (Jeu)
- Le Dashboard de l'Équipe IA
- Le Bridge Ollama

## 🎯 Fonctionnalités implémentées
- **Matchmaking Temps Réel** : File d'attente automatique avec bouton Annuler.
- **Chat de 3 minutes** : Avec compte à rebours synchronisé.
- **Vote de Turing** : Identification de l'adversaire (Humain ou Bot).
- **Mode Invité** : Supabase Anonymous Auth (`signInAnonymously`).
- **Bridge Ollama** : Polling Supabase, détection matchs/messages, réponses bot via `llama3.1:8b`.
- **Mode Duel** : Matchmaking opérationnel, bouton Annuler ajouté.
- **Auto-Clicker** : Outil `AUTO_CLICK/` pour tests et captures de zone (DPI-aware, stats persistantes, overlay dynamique avec compteur de clics).
- **Équipe IA 100** : Pyramide de 100 agents opérationnelle, hiérarchie validée par tests d'orchestration.
- **CI/CD** : Pipeline GitHub Actions (Lint, Test, Build) configuré.

## 🧪 Tests
```bash
# Tests unitaires et d'intégration (Vitest)
npm run test:run

# Vérification du Lint (ESLint v9)
npm run lint

# Test d'intégration matchmaking (Node 20+)
node --env-file=.env SCRIPTS/test_matchmaking.js
```

⚠️ **Pour tester le matchmaking manuellement** : utiliser **2 navigateurs différents** (ex: Chrome + Firefox) ou un onglet privé/incognito. Supabase partage la session anonyme via `localStorage` entre onglets d'un même navigateur.

## 📝 Commandes utiles
Voir [RUN_COMMANDS.md](RUN_COMMANDS.md) pour lancer le frontend et le bridge Ollama.

## 🤖 Équipe IA (EQUIPE_IA/)

Architecture multi-agents avec pyramide 100 agents (1+9+45+45).

```bash
# Régénérer le dashboard UI depuis le YAML de référence
python SCRIPTS/generate_ui.py
# Puis ouvrir UI/V2/index.html dans un navigateur
```

**Fichiers de référence :**
- `EQUIPE_IA/agents-registry.yaml` — Source de vérité des agents
- [`ROADMAP_EQUIPE_IA.md`](ROADMAP_EQUIPE_IA.md) — **Roadmap stratégique** : 5 phases, 19 tâches déléguées aux agents spécialisés (Quali, Scribe, Archi, Fullo, Dezy, Grow, Bizo), système de suivi complet et processus de clôture via `/close`.

---
*Dernière mise à jour : 2026-04-25 — Pyramide 100 Agents & CI/CD*
