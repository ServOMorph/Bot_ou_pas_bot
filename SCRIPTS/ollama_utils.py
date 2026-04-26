import ollama
import json
import re
import os
import sys

# Import de la configuration globale
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
try:
    import config
    OLLAMA_MODEL = config.OLLAMA_MODEL
except ImportError:
    OLLAMA_MODEL = "gemma3:4b"

def get_local_models():
    """Récupère la liste des modèles installés localement via Ollama"""
    try:
        models_data = ollama.list()
        if hasattr(models_data, 'models'):
            return [m.model for m in models_data.models] if hasattr(models_data.models[0], 'model') else [m.name for m in models_data.models]
        return [m['name'] for m in models_data.get('models', [])]
    except Exception as e:
        print(f"Erreur Ollama list: {e}")
        return []

def recommend_model(prompt=None, is_optimizer=True):
    """Recommande le modèle unique défini dans la configuration."""
    return OLLAMA_MODEL

def preload_model(model_name=None):
    """Charge le modèle en mémoire (VRAM) pour accélérer le premier appel"""
    if not model_name:
        model_name = OLLAMA_MODEL
    print(f"📦 Préchargement du modèle {model_name}...")
    try:
        ollama.chat(model=model_name, messages=[])
        print(f"✅ Modèle {model_name} chargé en mémoire.")
    except Exception as e:
        print(f"⚠️ Échec du préchargement: {e}")

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
