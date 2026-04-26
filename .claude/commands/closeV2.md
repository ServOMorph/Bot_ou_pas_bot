# Commande /close - Cloture de session

Analyse la conversation, met à jour la documentation et crée un commit.

## Instructions

Tu dois effectuer les actions suivantes dans l'ordre :

### 1. Analyse de la session

Parcourir toute la conversation pour identifier :
- Les tâches accomplies
- Les fichiers créés ou modifiés
- Les décisions prises
- Les problèmes résolus
- Les points en suspens

### 2. Clôture de l'Équipe IA (100 Agents) 🤖
*Note : Uniquement si l'équipe a été activée au démarrage.*

En tant qu'orchestrateur (**ChefIA**), assurer la synchronisation de la pyramide :
1. **Rapport de Session** : Générer un résumé détaillé des actions (Niv1, Niv2, Niv3) dans `EQUIPE_IA/outputs/ChefIA/session_[DATE]_[HEURE].md`.
2. **Source de Vérité** : Mettre à jour `EQUIPE_IA/outputs/ChefIA/dernier_session.md` (copie du dernier rapport).
3. **Mise à jour Roadmaps** : 
   - Mettre à jour `ROADMAP_EQUIPE_IA.md` (statut des tâches déléguées).
   - Si une phase est terminée (ex: `/close phase 1`), générer le rapport de phase dans `EQUIPE_IA/outputs/P[N]/REPORT.md`.
4. **Dashboard & Registre** : 
   - Mettre à jour `EQUIPE_IA/agents-registry.yaml` si la hiérarchie a évolué.
   - Régénérer le fichier `registry.json` pour l'UI :
     ```bash
     python SCRIPTS/generate_ui.py
     ```

### 3. Mise à jour de la ROADMAP

Modifier `ROADMAP.md` (s'il existe) pour :
- Cocher les tâches terminées (ajouter le marqueur approprié)
- Mettre à jour les statuts des phases
- Ajouter les nouvelles tâches identifiées
- Noter la date de dernière mise à jour

### 4. Mise à jour du README

Modifier `README.md` (s'il existe) pour :
- Refléter l'état actuel du projet
- Ajouter les nouvelles fonctionnalités implémentées
- Mettre à jour les instructions d'installation si nécessaire
- Créer le fichier s'il n'existe pas avec une structure de base

### 5. Extraire et stocker les apprentissages 📚

**Systeme centralise** : `C:\Users\raph6\Documents\ServOMorph\Agents_IA_V2\.claude\learnings\`

Analyser la conversation pour detecter :
- Fichiers modifies plusieurs fois (iterations)
- Erreurs explicites suivies de corrections
- Patterns "essai → echec → succes"

Stocker les apprentissages :
```bash
# Sauvegarder conversation dans fichier temporaire
# Appeler le gestionnaire
python C:\Users\raph6\Documents\ServOMorph\Agents_IA_V2\.claude\learnings\learning_manager.py analyze "[fichier_conversation]" "[NomProjet]"
```

Afficher le nombre d'apprentissages enregistres.

### 6. Création du commit

Exécuter les commandes git :
```bash
git add .
git status
```

Puis créer un commit avec un message descriptif au format :
```
[type]: description courte

- Détail des changements 1
- Détail des changements 2

🤖 Generated with Claude Code
Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

Types de commit :
- `feat` : nouvelle fonctionnalité
- `fix` : correction de bug
- `docs` : documentation uniquement
- `refactor` : refactorisation
- `test` : ajout de tests
- `chore` : maintenance

### 7. Rapport de clôture

Présenter un résumé :

```
## Session terminée

**Durée estimée** : [basé sur les échanges]
**Fichiers modifiés** : [nombre]

### Accompli
- [liste des réalisations]

### En suspens
- [liste des tâches restantes]

### Prochain démarrage
- [suggestions pour la prochaine session]
```
