# 🤖 Bot ou pas Bot ?

Arène de Turing moderne : duels anonymes chat IA-humain (18-35 ans).

## 🚀 État du Projet : MVP Phase 3 (En cours)
Le système de duel est opérationnel. Le pont Ollama pour l'IA est en cours d'intégration.
L'application est désormais optimisée pour PC et Mobile.

## 🛠 Stack Technique
- **Frontend** : React (Vite) + Vanilla CSS (Dark Mode Premium).
- **Backend** : Supabase (Auth, DB, Realtime).
- **IA** : Ollama (Intégration prévue en Phase 3).

## 📦 Installation Rapide
```bash
# 1. Cloner
git clone https://github.com/votre-repo/bot-ou-pas-bot.git
cd bot-ou-pas-bot

# 2. Installer
npm install

# 3. Configurer Supabase
# Copier .env.example vers .env.local et remplir les clés
# Exécuter supabase.sql dans votre instance Supabase

# 4. Lancer
npm run dev
```

## 🎯 Fonctionnalités implémentées
- **Matchmaking Temps Réel** : File d'attente automatique avec bouton Annuler.
- **Chat de 3 minutes** : Avec compte à rebours synchronisé.
- **Vote de Turing** : Identification de l'adversaire (Humain ou Bot).
- **Mode Invité** : Supabase Anonymous Auth (`signInAnonymously`).

## 🧪 Tests
```bash
# Test d'intégration matchmaking (Node 20+)
node --env-file=.env DEV_RAPH_SCRIPTS/test_matchmaking.js
```

⚠️ **Pour tester le matchmaking manuellement** : utiliser **2 navigateurs différents** (ex: Chrome + Firefox) ou un onglet privé/incognito. Supabase partage la session anonyme via `localStorage` entre onglets d'un même navigateur.

## 📝 Commandes utiles
Voir [RUN_COMMANDS.md](RUN_COMMANDS.md) pour lancer le frontend et le bridge Ollama.

## 🤖 Équipe IA (EQUIPE_IA/)

Architecture multi-agents avec pyramide 100 agents (1+9+45+45).

```bash
# Régénérer le dashboard UI depuis le YAML de référence
python DEV_RAPH_SCRIPTS/generate_ui.py
# Puis ouvrir UI/V2/index.html dans un navigateur
```

Fichier de référence : `EQUIPE_IA/agents-registry.yaml`

---
*Dernière mise à jour : 2026-04-24 — Session debug matchmaking*
