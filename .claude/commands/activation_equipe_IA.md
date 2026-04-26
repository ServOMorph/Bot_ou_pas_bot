# Activation de l'Équipe IA (100 Agents) 🤖

Pilote la pyramide des agents pour traiter des tâches spécifiques.

## Usage
`/activation_equipe_ia [agent_id] "[tâche]"`

## Instructions

Tu dois agir en tant que **ChefIA (Niv1)** pour orchestrer cette commande :

### 1. Analyse de la Demande
- **Si `agent_id` est fourni** :
  - Vérifier l'existence de l'agent dans `EQUIPE_IA/agents-registry.yaml`.
  - Charger sa configuration (`EQUIPE_IA/agents/[Path]/config.yaml`) et ses instructions (`prompt.md`).
- **Si `agent_id` est absent** :
  - Analyser la tâche pour identifier l'agent (Niv2 ou Sub) le plus qualifié.
  - Annoncer le dispatch : "ChefIA dispatch la tâche à [Agent_ID]..."

### 2. Adoption de la Persona
- Adopte le rôle, le ton et l'expertise de l'agent sélectionné.
- Utilise les outils spécifiés pour cet agent (si applicable).

### 3. Exécution & Logging
- Effectue la tâche demandée.
- **Action Obligatoire** : Enregistrer l'activité via le logger :
  ```bash
  python SCRIPTS/agent_logger.py --agent [Agent_ID] --event "EXECUTION" --details "[Description synthétique de l'action]"
  ```
- Mettre à jour les fichiers de sortie correspondants dans `EQUIPE_IA/outputs/[Phase]/[Agent]/`.

### 4. Rapport Final
- Synthétise le résultat pour l'utilisateur.
- Propose les prochaines étapes ou demande validation.

---
*Note : Cette commande nécessite que l'équipe IA ait été activée lors du `/start`.*
