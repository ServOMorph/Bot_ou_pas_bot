import ollama
import json
import os
import re
import signal
import sys
import time
from pathlib import Path

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
try:
    import config
    OLLAMA_MODEL = config.OLLAMA_MODEL
except ImportError:
    OLLAMA_MODEL = "gemma3:4b"

ROOT       = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
INDEX_FILE = os.path.join(ROOT, 'SCRIPTS', 'descriptions_index.json')
STORE_FILE = os.path.join(ROOT, 'UI', 'descriptions.json')

SYSTEM_PROMPT = (
    "Tu es expert en documentation de projet logiciel. "
    "Pour le fichier ou dossier donné, génère une fiche courte en français. "
    "Réponds UNIQUEMENT en JSON valide sur une ligne : {\"title\": \"...\", \"desc\": \"...\"} "
    "- title : 3-5 mots, le rôle du fichier dans ce projet "
    "- desc : 1-2 phrases max, ce qu'il fait concrètement"
)

_stop = False


def _handle_sigint(sig, frame):
    global _stop
    _stop = True
    print("\n⛔ Interruption reçue — arrêt après la description en cours...")


def load_config():
    with open(INDEX_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def discover_paths(cfg):
    """Scanne le projet selon les règles de discover{} et retourne la liste des chemins."""
    if not cfg.get('enabled', False):
        return []

    exclude_dirs = set(cfg.get('exclude_dirs', []))
    exclude_paths = cfg.get('exclude_paths', [])
    include_ext = set(cfg.get('include_extensions', []))
    exclude_ext = set(cfg.get('exclude_extensions', []))
    max_depth = cfg.get('max_depth', 3)

    def is_excluded(rel):
        for pat in exclude_paths:
            if rel == pat or rel.startswith(pat + '/'):
                return True
        return False

    discovered = []

    def scan(current_path, rel_prefix, depth):
        if depth > max_depth:
            return
        try:
            entries = sorted(
                current_path.iterdir(),
                key=lambda x: (not x.is_dir(), x.name.lower())
            )
            for entry in entries:
                if entry.name in exclude_dirs:
                    continue
                rel = f"{rel_prefix}/{entry.name}" if rel_prefix else entry.name
                if is_excluded(rel):
                    continue
                if entry.is_dir():
                    discovered.append(rel)
                    scan(entry, rel, depth + 1)
                else:
                    ext = entry.suffix.lower()
                    if include_ext and ext not in include_ext:
                        continue
                    if ext in exclude_ext:
                        continue
                    discovered.append(rel)
        except Exception:
            pass

    scan(Path(ROOT), '', 0)
    return discovered


def build_full_index():
    """Combine les chemins manuels + découverte automatique, sans doublons."""
    cfg = load_config()
    manual = cfg.get('paths', [])
    discovered = discover_paths(cfg.get('discover', {}))
    seen = set()
    result = []
    for p in manual + discovered:
        if p not in seen:
            seen.add(p)
            result.append(p)
    return result


def load_store():
    if not os.path.exists(STORE_FILE):
        return {}
    with open(STORE_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_store(data):
    with open(STORE_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


def get_pending(index, store):
    return [p for p in index if p not in store]


def generate_description(path_str):
    """Appelle Ollama et retourne {title, desc} ou None si erreur."""
    try:
        response = ollama.chat(model=OLLAMA_MODEL, messages=[
            {'role': 'system', 'content': SYSTEM_PROMPT},
            {'role': 'user',   'content': f"Fichier/dossier : {path_str}"}
        ])
        raw = response['message']['content'].strip()
        match = re.search(r'\{[^{}]+\}', raw)
        if match:
            return json.loads(match.group())
    except Exception as e:
        print(f"  ⚠️  Erreur Ollama : {e}")
    return None


def run_generator(standalone=False):
    """Génère les descriptions manquantes.
    standalone=True : logs détaillés + gestion Ctrl+C.
    standalone=False : appelé en thread background depuis run.py (sleep initial).
    """
    global _stop
    _stop = False

    if standalone:
        signal.signal(signal.SIGINT, _handle_sigint)
    else:
        time.sleep(3)

    try:
        index   = build_full_index()
        store   = load_store()
        pending = get_pending(index, store)
        done    = len(index) - len(pending)

        if standalone:
            print(f"\n{'='*52}")
            print(f"  Générateur de Descriptions — {OLLAMA_MODEL}")
            print(f"{'='*52}")
            print(f"  Découverts : {len(index)} chemins")
            print(f"  Déjà faits : {done}")
            print(f"  Manquants  : {len(pending)}")
            print(f"{'='*52}\n")

        if not pending:
            print("📚 Descriptions : tout est à jour.")
            return

        if standalone:
            print(f"🚀 Démarrage — {len(pending)} descriptions à générer")
            print("   Ctrl+C = arrêt propre, reprise automatique au prochain lancement\n")
        else:
            print(f"📝 Descriptions : {len(pending)} en attente...")

        generated = 0
        skipped   = 0

        for i, path_str in enumerate(pending, 1):
            if _stop:
                break

            if standalone:
                print(f"[{i}/{len(pending)}] ⏳  {path_str}")

            result = generate_description(path_str)

            if result and 'title' in result and 'desc' in result:
                store[path_str] = result
                save_store(store)
                generated += 1
                if standalone:
                    print(f"[{i}/{len(pending)}] ✅  {path_str}")
                    print(f"           titre : {result['title']}")
                    print(f"           desc  : {result['desc'][:90]}{'...' if len(result['desc']) > 90 else ''}\n")
                else:
                    print(f"✅ [{i}/{len(pending)}] '{path_str}' → \"{result['title']}\"")
            else:
                skipped += 1
                if standalone:
                    print(f"[{i}/{len(pending)}] ⏭️   {path_str} — ignoré (réponse invalide)\n")
                else:
                    print(f"⏭️  [{i}/{len(pending)}] '{path_str}' → ignoré")

        if standalone:
            remaining = len(pending) - generated - skipped
            print(f"{'='*52}")
            if _stop:
                print(f"  ⛔ Arrêté — {generated} générées, {remaining} restantes")
                print(f"  ▶  Relance : python SCRIPTS/description_generator.py")
            else:
                print(f"  ✅ Terminé — {generated} générées, {skipped} ignorées")
            print(f"{'='*52}\n")
        else:
            print("✅ Descriptions : génération terminée.")

    except Exception as e:
        print(f"❌ Erreur génération descriptions : {e}")


if __name__ == "__main__":
    if sys.platform == "win32":
        try:
            sys.stdout.reconfigure(encoding='utf-8')
        except Exception:
            pass
    run_generator(standalone=True)
