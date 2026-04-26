import yaml
import os
import re

# Configuration des chemins
BASE_DIR = r"D:\ServOMorph\Bot ou pas Bot"
EQUIPE_IA_DIR = os.path.join(BASE_DIR, "EQUIPE_IA")
AGENTS_DIR = os.path.join(EQUIPE_IA_DIR, "agents")
REGISTRY_PATH = os.path.join(EQUIPE_IA_DIR, "agents-registry.yaml")

def fix_inline_items(content):
    """Corrige les lignes YAML avec '; ' (format inline invalide)."""
    lines = content.split("\n")
    result = []
    for line in lines:
        if ";" in line and line.lstrip().startswith("- "):
            indent = len(line) - len(line.lstrip())
            parts = re.split(r"\s*;\s*", line.lstrip()[2:])
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
    m = re.search(r"```yaml\s*(.*?)```", raw, re.DOTALL)
    content = m.group(1).strip() if m else raw.strip()
    content = fix_inline_items(content)
    return yaml.safe_load(content)

def create_agent_files(path, config):
    """Crée le dossier de l'agent et ses fichiers de base."""
    os.makedirs(path, exist_ok=True)
    os.makedirs(os.path.join(path, "memory"), exist_ok=True)
    
    # config.yaml
    config_path = os.path.join(path, "config.yaml")
    with open(config_path, "w", encoding="utf-8") as f:
        yaml.dump(config, f, allow_unicode=True, default_flow_style=False)
    
    # prompt.md
    prompt_path = os.path.join(path, "prompt.md")
    if not os.path.exists(prompt_path):
        with open(prompt_path, "w", encoding="utf-8") as f:
            f.write(f"# Prompt pour {config.get('display_name', 'Agent')}\n\nRole: {config.get('role', 'Spécialiste')}\n")

def main():
    print(f"Chargement du registre: {REGISTRY_PATH}")
    registry = load_registry(REGISTRY_PATH)
    
    agents_data = registry.get("agents", {})
    count = 0
    
    # --- Niveau 1 ---
    for name, cfg in agents_data.get("niv1", {}).items():
        path = os.path.join(AGENTS_DIR, name)
        config = {
            "id": cfg.get("id"),
            "display_name": cfg.get("display_name"),
            "role": cfg.get("role"),
            "tool": cfg.get("tool"),
            "temperature": cfg.get("temperature"),
            "level": 1
        }
        create_agent_files(path, config)
        count += 1
        print(f"[N1] {name}")

    # --- Niveau 2, 3, 4 ---
    for name_n2, cfg_n2 in agents_data.get("niv2_principaux", {}).items():
        path_n2 = os.path.join(AGENTS_DIR, name_n2)
        config_n2 = {
            "id": cfg_n2.get("id"),
            "display_name": cfg_n2.get("display_name"),
            "role": cfg_n2.get("role", f"Expert {name_n2}"),
            "tool": cfg_n2.get("tool"),
            "temperature": cfg_n2.get("temperature"),
            "level": 2
        }
        create_agent_files(path_n2, config_n2)
        count += 1
        print(f"  [N2] {name_n2}")
        
        # Subs (Niveau 3)
        for sub in cfg_n2.get("subs", []):
            sub_id = sub.get("id")
            # Format: archi-backend -> Backend
            sub_folder_name = sub_id.split("-")[-1].capitalize()
            path_n3 = os.path.join(path_n2, sub_folder_name)
            
            config_n3 = {
                "id": sub_id,
                "display_name": sub_id.replace("-", " ").capitalize(),
                "role": f"Spécialiste {sub_folder_name}",
                "tool": {
                    "primary": sub.get("tool_primary"),
                    "fallback": sub.get("fallback")
                },
                "level": 3,
                "parent": cfg_n2.get("id")
            }
            create_agent_files(path_n3, config_n3)
            count += 1
            print(f"    [N3] {sub_id}")
            
            # Sous-Sous (Niveau 4)
            # Chaque Sub a exactement 1 Sous-Sous pour atteindre le total de 100
            ss_id = f"{sub_id}-expert"
            ss_folder_name = "Expert"
            path_n4 = os.path.join(path_n3, ss_folder_name)
            
            config_n4 = {
                "id": ss_id,
                "display_name": ss_id.replace("-", " ").capitalize(),
                "role": f"Expert ultra-spécialisé {sub_folder_name}",
                "tool": {
                    "primary": sub.get("tool_primary"), # Hérite du parent par défaut
                    "fallback": sub.get("fallback")
                },
                "level": 4,
                "parent": sub_id
            }
            create_agent_files(path_n4, config_n4)
            count += 1
            print(f"      [N4] {ss_id}")

    print(f"\nTerminé ! {count} agents générés/mis à jour.")

if __name__ == "__main__":
    main()
