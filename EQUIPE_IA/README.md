# 🤖 EQUIPE_IA - Configuration Centralisée

Configuration scalable et centralisée de l'équipe d'agents IA pour "Bot ou pas Bot ?".

## 📐 Architecture

```
EQUIPE_IA/
├── tools.yaml              ← Hiérarchie maître des outils & fallbacks
├── agents/
│   ├── ChefIA/            ← Claude Opus (orchestration)
│   ├── Archi/             ← Claude Sonnet (architecture)
│   ├── Fullo/             ← Claude Sonnet (fullstack)
│   ├── Mobi/              ← Claude Sonnet (mobile)
│   ├── Quali/             ← Gemini Flash (tests)
│   ├── Dezy/              ← Claude Design (UI/UX)
│   ├── Scribe/            ← Claude Haiku (docs)
│   ├── Grow/              ← Claude Sonnet (growth)
│   └── Bizo/              ← ChatGPT Cloud (business)
```

## 🔧 Système de Fallback

### Hiérarchie centralisée (`tools.yaml`)

Chaque outil définit son fallback automatique:
```yaml
claude-opus-4-7:
  fallback: claude-sonnet-4-6    # ← Fallback auto si Opus indispo

claude-sonnet-4-6:
  fallback: gemini-3-flash       # ← Fallback si Sonnet down

gemini-3-flash:
  fallback: gemma-4-local        # ← Fallback local offline
```

### Chaîne de fallback complète

```
ChefIA: Opus → Sonnet → Gemini Flash → Gemma Local
Archi/Fullo/Mobi/Grow: Sonnet → Gemini Flash → Gemma Local
Quali: Gemini Flash → Gemma Local
Dezy: Claude Design → Gemini Web Chat
Scribe: Haiku → Mistral Web
Bizo: ChatGPT Cloud → (manuel)
```

## 📋 Configuration par Agent

### Minimale (référence la hiérarchie maître)

```yaml
# agents/ChefIA/config.yaml
tool: claude-opus-4-7
temperature: 0.2
role: orchestration
description: "Orchestration globale du projet"
```

Les fallbacks sont résolus automatiquement depuis `tools.yaml`.

### Paramètres

| Paramètre | Format | Exemples |
|-----------|--------|----------|
| `tool` | string | `claude-opus-4-7`, `claude-sonnet-4-6` |
| `temperature` | 0.0–1.0 | `0.2` (précis), `0.7` (créatif) |
| `role` | string | `orchestration`, `development`, `testing`, `design`, `business` |
| `description` | string | Description du rôle de l'agent |

## 🌡️ Températures recommandées

| Rôle | Température | Cas d'usage |
|------|-------------|-----------|
| **Orchestration** | 0.2 | Décisions déterministes (Chef) |
| **Development** | 0.2 | Code précis (Archi, Fullo, Mobi, Scribe, Grow) |
| **Testing** | 0.1 | Tests reproductibles (Quali) |
| **Design** | 0.7 | Créativité (Dezy) |
| **Business** | 0.6 | Stratégies (Bizo) |
| **Search** | 0.5 | Équilibre info (Perplexity) |

## 🛠️ Comment modifier la hiérarchie

### ✅ Changer un outil pour un agent

1. Éditez `agents/XYZ/config.yaml`:
   ```yaml
   tool: nouveau-tool  # Au lieu de claude-sonnet-4-6
   ```

2. Le système trouve automatiquement le fallback dans `tools.yaml`.

### ✅ Changer un fallback global

1. Éditez `tools.yaml`, section `tools`:
   ```yaml
   claude-sonnet-4-6:
     fallback: gemini-3-flash  # Ancien: claude-design
   ```

2. **Tous** les agents utilisant Sonnet héritent du nouveau fallback.

### ✅ Ajouter un nouvel outil

1. Ajoutez dans `tools.yaml`:
   ```yaml
   nouveau-tool:
     provider: provider-name
     tier: tier-name
     fallback: tool-fallback
     use_cases: [...]
   ```

2. Utilisez-le dans un agent:
   ```yaml
   tool: nouveau-tool
   ```

## 🔗 Bonus globaux

### Recherche (tous les agents)

**Outil**: Perplexity Comet (infos up-to-date)
**Fallback**: Gemini Web Chat
**Utilisation**: Équipe IA peut utiliser en bonus pour recherche actualisée

### Local/Offline (tests)

**Outil**: Gemma 4 (Ollama)
**Utilisation**: Tests sans dépendance cloud, fallback éco

## 📊 Résumé des outils

| Outil | Provider | Tier | Température | Cas d'usage |
|-------|----------|------|-------------|-----------|
| `claude-opus-4-7` | Anthropic | Orchestration | 0.2 | Chef (orchestration) |
| `claude-sonnet-4-6` | Anthropic | Development | 0.2 | Archi, Fullo, Mobi, Grow |
| `gemini-3-flash` | Google | Testing | 0.1 | Quali (tests rapides) |
| `claude-design` | Anthropic | Design | 0.7 | Dezy (UI/UX) |
| `claude-haiku-4-5` | Anthropic | Lightweight | 0.2 | Scribe (docs rapides) |
| `chatgpt-chat-cloud` | OpenAI | Alternative | 0.6 | Bizo (business) |
| `perplexity-comet` | Perplexity | Search | 0.5 | Bonus (recherche) |
| `gemma-4-local` | Ollama | Local | — | Fallback offline |

## 🚀 Configuration en temps réel

Le système supporte le switch automatique:
- ✅ Si le tool principal indisponible → Fallback 1
- ✅ Si Fallback 1 indisponible → Fallback 2
- ✅ ...jusqu'à Gemma local ou défaillance finale

Voir `tools.yaml` section `fallback_strategy` pour les timeouts et retry settings.

---

**Version**: 1.0 | **Dernier update**: 2026-04-24