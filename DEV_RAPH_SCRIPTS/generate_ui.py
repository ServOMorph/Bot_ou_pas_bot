"""
generate_ui.py - Génère registry.json depuis agents-registry.yaml
Usage: python generate_ui.py
"""
import yaml
import json
import os
import re

BASE   = r"D:\ServOMorph\Bot ou pas Bot"
YAML_IN  = os.path.join(BASE, "EQUIPE_IA", "agents-registry.yaml")
JSON_OUT = os.path.join(BASE, "UI", "V2", "registry.json")

def fix_inline_items(content):
    """Corrige les lignes YAML avec '; ' (format inline invalide).
    - id: "x" ; tool_primary: "y"  ->  - id: "x"\n    tool_primary: "y"
    """
    lines = content.split("\n")
    result = []
    for line in lines:
        if ";" in line and line.lstrip().startswith("- "):
            indent = len(line) - len(line.lstrip())
            parts = re.split(r"\s*;\s*", line.lstrip()[2:])  # retire le "- " de tête
            for i, part in enumerate(parts):
                part = part.strip()
                if i == 0:
                    result.append(" " * indent + "- " + part)
                else:
                    result.append(" " * (indent + 2) + part)
        else:
            result.append(line)
    return "\n".join(result)


def load_registry(path):
    with open(path, encoding="utf-8") as f:
        raw = f.read()

    # Extrait le bloc YAML si encapsulé dans ```yaml ... ```
    m = re.search(r"```yaml\s*(.*?)```", raw, re.DOTALL)
    content = m.group(1).strip() if m else raw.strip()

    # Nettoie le format inline invalide
    content = fix_inline_items(content)

    return yaml.safe_load(content)

def extract_agents(data):
    """Aplatit la structure pyramide en liste exploitable pour l'UI."""
    agents = []
    raw = data.get("agents", {})

    # Niveau 1
    for name, cfg in raw.get("niv1", {}).items():
        agents.append({
            "name": name,
            "level": 1,
            "display_name": cfg.get("display_name", name),
            "description": cfg.get("description", ""),
            "role": cfg.get("role", ""),
            "tool_primary": cfg.get("tool", {}).get("primary", ""),
            "fallbacks": cfg.get("tool", {}).get("fallbacks", []),
            "temperature": cfg.get("temperature", 0.5),
            "subs": []
        })

    # Niveau 2 + leurs subs
    for name, cfg in raw.get("niv2_principaux", {}).items():
        subs = []
        for s in cfg.get("subs", []):
            subs.append({
                "id": s.get("id", ""),
                "tool": s.get("tool_primary", "")
            })
        agents.append({
            "name": name,
            "level": 2,
            "display_name": cfg.get("display_name", name),
            "description": cfg.get("description", ""),
            "role": cfg.get("role", ""),
            "tool_primary": cfg.get("tool", {}).get("primary", ""),
            "fallbacks": cfg.get("tool", {}).get("fallbacks", []),
            "temperature": cfg.get("temperature", 0.5),
            "subs": subs
        })

    return agents

def build_output(data):
    return {
        "meta": {
            "version": data.get("version", ""),
            "project": data.get("project", ""),
            "generated": __import__("datetime").datetime.now().isoformat(timespec="seconds"),
            "source": "agents-registry.yaml"
        },
        "pyramid": data.get("pyramid", {}),
        "models_available": data.get("models_available", []),
        "agents": extract_agents(data),
        "workflows": data.get("workflows", {}),
    }

def main():
    print(f"Lecture  : {YAML_IN}")
    data = load_registry(YAML_IN)

    out = build_output(data)

    os.makedirs(os.path.dirname(JSON_OUT), exist_ok=True)
    with open(JSON_OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    n = len(out["agents"])
    print(f"[OK] registry.json genere  ({n} agents, {len(out['models_available'])} modeles)")
    print(f"   -> {JSON_OUT}")

if __name__ == "__main__":
    main()
