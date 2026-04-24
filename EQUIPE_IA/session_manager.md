# Bot ou pas Bot ? - Session Manager 🚀

## 🏁 OUVERTURE (30s)
1. **Lire les fichiers partagés** :
   - [agents-registry.yaml](file:///d:/ServOMorph/Bot%20ou%20pas%20Bot/agents-registry.yaml) (Source de vérité)
   - [outputs/ChefIA/dernier_session.md](file:///d:/ServOMorph/Bot%20ou%20pas%20Bot/outputs/ChefIA/dernier_session.md) (État actuel)
2. **Coller le PROMPT RELANCE** (voir ci-dessous) dans Gemini 3 Flash.
3. **Exécuter l'Action #1** prioritaire.

---

## 📝 PROMPT RELANCE
```text
ChefIA RELANCE "Bot ou pas Bot ?"

CONTEXTE (agents-registry.yaml):
- Phase1 Docs ✅
- Phase2 Code ✅ (React/Supabase duels)
- Status: [INSÉRER dernier_session.md]

Status projet ? Action #1 prioritaire ?
```

---

## 🏁 CLÔTURE (30s)
1. **Générer le résumé** : Sauvegarder dans `outputs/ChefIA/session_[HHMM].md`.
2. **Mettre à jour** : Écraser `outputs/ChefIA/dernier_session.md` avec le dernier résumé.
3. **Commit & Push** : Synchroniser les 2 fichiers de vérité.

---

## 📂 FICHIERS CRITIQUES (Toujours)
- **agents-registry.yaml** : Liste des 100 agents, modèles utilisés et rôles.
- **outputs/ChefIA/dernier_session.md** : Dernier état stable, tâches en cours et prochain blocage.

---

## 🛠 STACK DE RÉFÉRENCE
- **Frontend** : Vite React + Vanilla CSS
- **Backend** : Supabase Realtime
- **IA** : Ollama (Phase 3 Integration)
