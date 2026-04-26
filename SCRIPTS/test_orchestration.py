import yaml
import os

BASE_DIR = r"D:\ServOMorph\Bot ou pas Bot"
AGENTS_DIR = os.path.join(BASE_DIR, "EQUIPE_IA", "agents")

def test_orchestration():
    print("[TEST] Verification de l'orchestration de la pyramide...")
    
    agents = []
    for root, dirs, files in os.walk(AGENTS_DIR):
        if "config.yaml" in files:
            with open(os.path.join(root, "config.yaml"), encoding="utf-8") as f:
                cfg = yaml.safe_load(f)
                cfg["path"] = root
                agents.append(cfg)

    print(f"Total agents detectes : {len(agents)}")
    
    # Test 1: Nombre total
    if len(agents) == 100:
        print("[OK] Total de 100 agents atteint.")
    else:
        print(f"[FAIL] Nombre d'agents incorrect : {len(agents)} au lieu de 100.")

    # Test 2: Niveaux
    levels = {1: 0, 2: 0, 3: 0, 4: 0}
    for a in agents:
        l = a.get("level")
        if l in levels:
            levels[l] += 1
    
    print(f"Repartition : Niv1: {levels[1]}, Niv2: {levels[2]}, Niv3: {levels[3]}, Niv4: {levels[4]}")
    
    expected = {1: 1, 2: 9, 3: 45, 4: 45}
    if levels == expected:
        print("[OK] Structure de la pyramide conforme (1+9+45+45).")
    else:
        print(f"[FAIL] Structure non conforme. Attendu: {expected}")

    # Test 3: Chaine de commande (Parent-Child)
    errors = 0
    for a in agents:
        if a.get("level") == 4:
            parent_id = a.get("parent")
            parent = next((p for p in agents if p.get("id") == parent_id), None)
            if not parent or parent.get("level") != 3:
                print(f"[FAIL] Agent Niv4 {a.get('id')} a un parent invalide: {parent_id}")
                errors += 1
        elif a.get("level") == 3:
            parent_id = a.get("parent")
            parent = next((p for p in agents if p.get("id") == parent_id), None)
            if not parent or parent.get("level") != 2:
                print(f"[FAIL] Agent Niv3 {a.get('id')} a un parent invalide: {parent_id}")
                errors += 1

    if errors == 0:
        print("[OK] Chaine de commande validee pour tous les agents.")
    else:
        print(f"[FAIL] {errors} erreurs de hierarchie detectees.")

    return len(agents) == 100 and levels == expected and errors == 0

if __name__ == "__main__":
    success = test_orchestration()
    if success:
        print("\nTEST D'ORCHESTRATION REUSSI !")
    else:
        print("\nTEST D'ORCHESTRATION ECHOUE !")
        exit(1)
