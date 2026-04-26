# Apprentissage : Refonte Launcher Gamer-Dev

## Contexte
Demande de refonte esthétique pour un public "Gamer Développeur" (20 ans) et ajout de fonctionnalités informatives.

## Enseignements Techniques

### 1. Synchronisation Backend/Frontend
- **Pattern** : Utiliser un endpoint `/api/config` pour transmettre des constantes Python (`config.py`) au JavaScript.
- **Avantage** : Permet de changer la version ou d'activer/désactiver des features (bulles d'info) sans toucher au JS.

### 2. Design "Gamer HUD"
- **Glassmorphism** : `backdrop-filter: blur(20px)` avec un fond très sombre (`rgba(10, 10, 15, 0.7)`) donne un aspect premium.
- **Bordures HUD** : Utiliser `clip-path: polygon(...)` pour créer des formes angulaires non-rectangulaires.
- **RGB/Neon** : Utiliser des ombres portées colorées subtiles (`box-shadow: 0 0 20px rgba(0, 242, 255, 0.3)`) pour l'effet de lueur.

### 3. UX Informative
- **Info Bubbles** : Le survol (hover) dynamique est préféré à un affichage statique pour garder l'interface épurée ("Clean Gamer UI").
- **Double Information** : Séparer "Mission" (Usage) et "Architecture" (Tech) permet de satisfaire à la fois le joueur et le développeur.

### 4. Responsivité Compacte
- **Scaling** : Réduire la taille par un facteur (0.7) nécessite une réduction coordonnée du padding, des icônes et des polices.
- **Breakpoint** : Cacher les éléments complexes (bulles latérales) sur les petits écrans (`@media (max-width: 1400px)`) pour préserver l'utilité du launcher.

## Erreurs & Corrections
- **Problème** : Les bulles d'info s'affichaient même si la config était sur `False` initialement.
- **Solution** : Ajouter une garde `if (!bubblesEnabled) return;` dans les listeners de survol.
