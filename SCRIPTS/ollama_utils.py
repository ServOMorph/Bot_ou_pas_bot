import ollama
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

def optimize_prompt(user_prompt, model_name=None):
    """Optimise le prompt via Ollama en utilisant le modèle configuré"""
    if not model_name:
        model_name = OLLAMA_MODEL
        
    system_prompt = (
        "Tu es un expert en Prompt Engineering. Ta mission est de transformer une demande utilisateur simple "
        "en un prompt structuré, détaillé et optimisé pour des agents IA (type Claude ou GPT-4). "
        "Le prompt généré doit inclure :\n"
        "- Un rôle clair (Persona)\n"
        "- Le contexte et l'objectif\n"
        "- Des instructions étape par étape\n"
        "- Les contraintes de format ou de style (ex: premium, moderne)\n"
        "Réponds UNIQUEMENT avec le prompt optimisé, sans aucune introduction ni conclusion."
    )
    
    try:
        response = ollama.chat(model=model_name, messages=[
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': user_prompt}
        ])
        return {
            "optimized": response['message']['content'],
            "model": model_name,
            "recommended": OLLAMA_MODEL
        }
    except Exception as e:
        return {"error": str(e)}
