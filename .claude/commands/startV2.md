# Commande /start - Analyse et suivi de la Roadmap

Analyse le projet pour démarrer une session de travail efficace.

## Instructions

Tu dois effectuer les actions suivantes dans l'ordre :

### 1. Lecture des documents clés
- Lire `ROADMAP.md` (s'il existe) pour comprendre les phases, tâches et statuts actuels
- Lire `README.md` (s'il existe) pour comprendre le contexte global du projet

### 2. Activation de l'Équipe IA (Optionnel) 🤖
- **Question à l'utilisateur** : "Souhaitez-vous activer l'Équipe IA (100 agents) pour cette session ?"
- **Si NON** : Passer directement à l'étape 4 (Charger les apprentissages) et agir comme un assistant de code standard.
- **Si OUI** : Continuer avec l'étape 3.

### 3. Initiation de la Communication Agentique (100 IA) 🤖
- Lire `EQUIPE_IA/agents-registry.yaml` pour charger la hiérarchie des 100 agents.
- Trouver et lire le dernier rapport de session dans `EQUIPE_IA/outputs/ChefIA/` (le plus récent).
- **Action Critique** : À partir de maintenant, agir en tant qu'orchestrateur de la pyramide des 100 agents pour traiter les demandes.

### 4. Analyse de l'état actuel
- Identifier les tâches marquées "En cours" ou "À démarrer"
- Repérer les prochaines actions immédiates listées
- Noter les métriques de succès définies

### 5. Charger les apprentissages pertinents 📚

**Systeme centralise** : `C:\Users\raph6\Documents\ServOMorph\Agents_IA_V2\.claude\learnings\`

1. Detecter le contexte du projet (technologies, type, fichiers recents)
2. Rechercher les apprentissages pertinents :
   ```bash
   python C:\Users\raph6\Documents\ServOMorph\Agents_IA_V2\.claude\learnings\learning_manager.py search "[contexte]"
   ```
3. Afficher les apprentissages charges (si disponibles)

### 6. Synthèse à présenter

Présente un rapport structuré contenant :

```
## État du Projet

**Phase actuelle** : [numéro et nom de la phase]
**Statut global** : [À démarrer / En cours / Bloqué]

## Tâches Prioritaires

1. [Tâche prioritaire 1]
2. [Tâche prioritaire 2]
3. [Tâche prioritaire 3]

## Contexte Technique

- Stack : [technologies identifiées]
- Structure : [architecture du projet]

## Prêt à travailler sur

[Liste des actions réalisables immédiatement]
```

### 7. Question de démarrage

Termine en demandant :
> "Sur quelle tâche souhaites-tu travailler ?"
