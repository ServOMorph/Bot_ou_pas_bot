# AutoAntigravity Clicker & Capture

Outil d'automatisation simple basé sur la reconnaissance d'images avec capture de zone intégrée.

## 🚀 Installation

```bash
pip install -r requirements.txt
```

## 🛠 Usage

1. Lancer `main.py` : `python main.py`
2. L'overlay apparaît en bas à droite de l'écran.

### Contrôles de l'Overlay :
- **Clic Gauche** : Active/Désactive l'Auto-Clicker (Vert = ON, Rouge = OFF).
- **Clic Droit** : Lance l'outil de **Capture de Zone**.
- **Mode Capture** : Cliquez et glissez pour sélectionner une zone. La capture est enregistrée dans le dossier racine.

### Fonctionnement du Clicker :
- Le script scanne le dossier `assets/`.
- S'il trouve une correspondance à l'écran, il affiche un **rond rouge** puis clique au centre.
- Ajoutez vos images cibles (boutons, icônes) dans le dossier `assets/`.

## 📂 Structure
- `main.py` : Orchestrateur principal.
- `overlay.py` : Interface flottante.
- `capture.py` : Outil de sélection de zone.
- `clicker.py` : Logique de détection et de clic.
- `assets/` : Dossier contenant les images à cliquer.
