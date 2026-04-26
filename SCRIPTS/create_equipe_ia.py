import os
import yaml

def create_structure(base_path):
    os.makedirs(base_path, exist_ok=True)
    
    # Root files
    open(os.path.join(base_path, "README.md"), "w", encoding="utf-8").write("# Équipe IA\n\nVue d'ensemble du projet Bot ou pas Bot.\n")
    open(os.path.join(base_path, "config.yaml"), "w", encoding="utf-8").write("models:\n  default: gpt-4o\napi_keys:\n  openai: YOUR_KEY")
    
    # Agents
    agents = ["ChefIA", "Archi", "Fullo", "Mobi", "Quali", "Dezy", "Scribe", "Grow", "Bizo"]
    for agent in agents:
        agent_dir = os.path.join(base_path, "agents", agent)
        os.makedirs(os.path.join(agent_dir, "memory"), exist_ok=True)
        open(os.path.join(agent_dir, "prompt.md"), "w", encoding="utf-8").write(f"# Prompt système pour {agent}\n\nVous êtes {agent}.")
        open(os.path.join(agent_dir, "config.yaml"), "w", encoding="utf-8").write(f"model: gpt-4o\ntemperature: 0.7")
        open(os.path.join(agent_dir, "tools.yaml"), "w", encoding="utf-8").write("tools:\n  - tool1\n  - tool2")
    
    # Workflows
    workflows = ["phase1_docs.yaml", "phase2_dev.yaml", "phase3_gtm.yaml", "phase4_scale.yaml"]
    os.makedirs(os.path.join(base_path, "workflows"), exist_ok=True)
    for wf in workflows:
        open(os.path.join(base_path, "workflows", wf), "w", encoding="utf-8").write(f"# Workflow {wf}\nphases:\n  - agent: ChefIA")
    
    # Shared
    os.makedirs(os.path.join(base_path, "shared", "context"), exist_ok=True)
    os.makedirs(os.path.join(base_path, "shared", "tools"), exist_ok=True)
    os.makedirs(os.path.join(base_path, "shared", "templates"), exist_ok=True)
    open(os.path.join(base_path, "shared", "context", "projet.md"), "w", encoding="utf-8").write("# Brief projet Bot ou pas Bot\n\nSite de duels chat IA vs humain.")
    open(os.path.join(base_path, "shared", "context", "glossaire.md"), "w", encoding="utf-8").write("# Glossaire\n\n- Bot: IA")
    
    # Outputs (exemples pour ChefIA et Scribe, extensible)
    os.makedirs(os.path.join(base_path, "outputs", "ChefIA"), exist_ok=True)
    os.makedirs(os.path.join(base_path, "outputs", "Scribe"), exist_ok=True)
    
    print(f"✅ Structure créée avec succès dans: {base_path}")

if __name__ == "__main__":
    target_dir = r"D:\ServOMorph\Bot ou pas Bot\EQUIPE_IA"
    create_structure(target_dir)