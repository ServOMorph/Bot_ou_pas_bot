# PLAN — Optimiseur de Prompts : Sélecteur de Cible IA

**Objectif** : Sélecteur "Pour qui optimiser ?" dynamique chargé depuis JSON.  
Ajouter un modèle = 1 objet JSON, 0 ligne de code.

| Fichier | Action |
|---------|--------|
| `SCRIPTS/prompt_targets.json` | CRÉER |
| `SCRIPTS/ollama_utils.py` | MODIFIER |
| `run.py` | MODIFIER |
| `UI/prompt_optimizer.html` | MODIFIER |

---

## ÉTAPE 1 — Créer `SCRIPTS/prompt_targets.json`

```json
{
  "targets": [
    {
      "id": "claude-code",
      "name": "Claude Code",
      "icon": "⚡",
      "description": "Code, architecture, tâches techniques complexes",
      "color": "#CC785C",
      "system_prompt": "Tu es un expert en Prompt Engineering spécialisé pour Claude Code (Anthropic).\nClaude Code excelle avec des prompts qui :\n- Définissent un rôle clair (ex: \"Tu es un expert en...\")\n- Utilisent des balises XML pour structurer (<task>, <context>, <constraints>, <output_format>)\n- Détaillent les étapes séquentielles numérotées\n- Précisent le format de sortie attendu\nTransforme la demande en prompt structuré et technique.\nRéponds UNIQUEMENT avec le prompt optimisé, sans introduction ni conclusion."
    },
    {
      "id": "gemini-3-flash",
      "name": "Gemini 3 Flash",
      "icon": "✨",
      "description": "Rapide, créatif, multimodal",
      "color": "#4285F4",
      "system_prompt": "Tu es un expert en Prompt Engineering spécialisé pour Gemini 3 Flash (Google).\nGemini Flash préfère des prompts :\n- Concis et directs (pas de XML verbeux)\n- Objectif en 1-2 phrases au début\n- Bullets courts pour les contraintes\n- Orientés résultat, pas processus\nTransforme la demande en prompt concis et direct.\nRéponds UNIQUEMENT avec le prompt optimisé, sans introduction ni conclusion."
    }
  ]
}
```

---

## ÉTAPE 2 — `SCRIPTS/ollama_utils.py`

### 2a — Ligne 2 : insérer `import json` entre `import ollama` et `import re`

### 2b — Insérer avant la ligne 40 (`def optimize_prompt`) :

```python
def _get_system_prompt_for_target(target_id):
    targets_file = os.path.join(os.path.dirname(__file__), 'prompt_targets.json')
    generic_prompt = (
        "Tu es un expert en Prompt Engineering. Transforme la demande en prompt structuré "
        "avec rôle clair, contexte, étapes et contraintes de format.\n"
        "Réponds UNIQUEMENT avec le prompt optimisé, sans introduction ni conclusion."
    )
    if not target_id:
        return generic_prompt
    try:
        with open(targets_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        for target in data.get('targets', []):
            if target['id'] == target_id:
                return target['system_prompt']
    except Exception:
        pass
    return generic_prompt
```

### 2c — Remplacer les lignes 40-67 (`def optimize_prompt` jusqu'à fin fichier) :

```python
def optimize_prompt(user_prompt, model_name=None, target_id=None):
    if not model_name:
        model_name = OLLAMA_MODEL
    system_prompt = _get_system_prompt_for_target(target_id)
    try:
        response = ollama.chat(model=model_name, messages=[
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': user_prompt}
        ])
        return {
            "optimized": response['message']['content'],
            "model": model_name,
            "recommended": OLLAMA_MODEL,
            "target_id": target_id
        }
    except Exception as e:
        return {"error": str(e)}
```

---

## ÉTAPE 3 — `run.py`

### 3a — Insérer après la ligne 83 (après le `return` de `/api/models`) :

```python
        # Route API : Prompt Targets
        if parsed_url.path == '/api/prompt-targets':
            targets_file = os.path.join(os.path.dirname(__file__), 'SCRIPTS', 'prompt_targets.json')
            try:
                with open(targets_file, 'r', encoding='utf-8') as f:
                    targets_data = json.load(f)
            except Exception:
                targets_data = {"targets": []}
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(targets_data).encode())
            return
```

### 3b — Remplacer les lignes 101-105 dans `do_POST` :

```python
                user_prompt = params.get('prompt', '')
                model_name = params.get('model')
                target_id = params.get('target_id')
                print(f"🧠 Optimisation pour [{target_id or 'générique'}] via {model_name or 'Auto-selection'}...")
                result = ollama_utils.optimize_prompt(user_prompt, model_name, target_id)
```

### 3c — Dans `save_prompt_history()` ligne 181, ajouter dans le dict `history.append` :

```python
                "target_id": result.get("target_id")
```

---

## ÉTAPE 4 — `UI/prompt_optimizer.html`

### 4a — Insérer avant `</style>` (ligne 69) :

```css
        .targets-section { margin-bottom: 24px; }
        .targets-label {
            font-size: 0.85rem;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 12px;
        }
        .targets-grid { display: flex; gap: 12px; flex-wrap: wrap; }
        .target-card {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 16px;
            background: rgba(255,255,255,0.04);
            border: 1.5px solid rgba(255,255,255,0.1);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s ease;
            flex: 1;
            min-width: 160px;
        }
        .target-card:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.25); }
        .target-card.selected { background: rgba(255,255,255,0.07); border-width: 2px; }
        .target-icon { font-size: 1.4rem; line-height: 1; }
        .target-info { display: flex; flex-direction: column; gap: 2px; }
        .target-name { font-weight: 600; font-size: 0.9rem; color: var(--text-color); }
        .target-desc { font-size: 0.75rem; color: var(--text-dim); }
        .targets-loading { color: var(--text-dim); font-size: 0.85rem; font-style: italic; }
```

### 4b — Remplacer les lignes 84-99 (la `<div class="card">`) :

```html
            <div class="card">
                <div class="targets-section">
                    <div class="targets-label">Pour qui optimiser ?</div>
                    <div class="targets-grid" id="targets-grid">
                        <span class="targets-loading">Chargement des cibles...</span>
                    </div>
                </div>
                <div class="title">Votre demande</div>
                <p class="description">Saisissez votre idée brute. Gemma 3:4b la reformule selon la cible choisie.</p>
                <textarea id="user-prompt" class="input-field" placeholder="Ex: Crée une mécanique de combat au tour par tour..."></textarea>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button id="optimize-btn" class="btn-label" style="flex: 1; padding: 12px;">Optimiser mon Prompt 🚀</button>
                    <span id="loading-spinner" class="loading">Gemma 3 réfléchit...</span>
                </div>
                <div class="title" style="margin-top: 30px;">Résultat Optimisé</div>
                <div class="result-box" id="result-box">
                    <button id="copy-btn" class="copy-btn">Copier</button>
                    <span id="result-text" style="color: var(--text-dim);">Le prompt optimisé apparaîtra ici...</span>
                </div>
            </div>
```

### 4c — Remplacer le `<script>` entier (lignes 105-152) :

```html
    <script>
        let selectedTargetId = null;

        async function loadTargets() {
            const grid = document.getElementById('targets-grid');
            try {
                const data = await fetch('/api/prompt-targets').then(r => r.json());
                grid.innerHTML = '';
                (data.targets || []).forEach((target, i) => {
                    const card = document.createElement('div');
                    card.className = 'target-card';
                    card.dataset.id = target.id;
                    card.innerHTML = `<span class="target-icon">${target.icon}</span><div class="target-info"><span class="target-name">${target.name}</span><span class="target-desc">${target.description}</span></div>`;
                    card.onclick = () => selectTarget(target.id, target.color);
                    grid.appendChild(card);
                    if (i === 0) selectTarget(target.id, target.color);
                });
            } catch {
                grid.innerHTML = '<span class="targets-loading">Impossible de charger les cibles.</span>';
            }
        }

        function selectTarget(targetId, color) {
            selectedTargetId = targetId;
            document.querySelectorAll('.target-card').forEach(card => {
                const sel = card.dataset.id === targetId;
                card.classList.toggle('selected', sel);
                card.style.borderColor = sel ? color : '';
            });
        }

        async function optimize() {
            const prompt = document.getElementById('user-prompt').value;
            if (!prompt) return;
            const btn = document.getElementById('optimize-btn');
            const loading = document.getElementById('loading-spinner');
            const resultText = document.getElementById('result-text');
            const copyBtn = document.getElementById('copy-btn');
            btn.disabled = true;
            loading.style.display = 'inline';
            resultText.style.color = 'var(--text-dim)';
            resultText.textContent = "Génération en cours...";
            try {
                const data = await fetch('/api/optimize', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt, target_id: selectedTargetId })
                }).then(r => r.json());
                if (data.optimized) {
                    resultText.textContent = data.optimized;
                    resultText.style.color = 'white';
                    copyBtn.style.display = 'block';
                } else {
                    resultText.textContent = "Erreur: " + (data.error || "IA indisponible");
                }
            } catch {
                resultText.textContent = "Erreur de connexion au serveur.";
            } finally {
                btn.disabled = false;
                loading.style.display = 'none';
            }
        }

        document.getElementById('optimize-btn').onclick = optimize;
        document.getElementById('copy-btn').onclick = () => {
            navigator.clipboard.writeText(document.getElementById('result-text').textContent);
            const btn = document.getElementById('copy-btn');
            btn.textContent = "Copié !";
            setTimeout(() => btn.textContent = "Copier", 2000);
        };

        loadTargets();
    </script>
```
