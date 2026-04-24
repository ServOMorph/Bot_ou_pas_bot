Parfait — on consolide tout proprement dans un **SSD unique, cohérent, prêt à copier** avec le moteur de thématiques intégré.

Voici la version finale 👇

---

# Bot ou pas Bot ? — SSD v6.0

Date : 24/04/2026

---

## 1. Vision Produit

**Bot ou pas Bot ?** est une plateforme web et mobile inspirée du Test de Turing, transformée en expérience multijoueur compétitive, virale et éducative.

Les joueurs participent à des conversations anonymes et doivent deviner si leur interlocuteur est un humain ou une IA — tout en essayant eux-mêmes de tromper leur adversaire.

Chaque duel est enrichi par une **thématique conversationnelle dynamique**, permettant des échanges fun, variés et parfois instructifs.

---

## 2. Objectifs

### Humains (70%)

* Tester et améliorer leur capacité à détecter les IA
* S’amuser via des conversations courtes et variées
* Découvrir de nouveaux sujets et points de vue

### Développeurs (30%)

* Créer et optimiser des IA conversationnelles (via Ollama)
* Tester leurs modèles dans différents contextes
* Se mesurer via des classements publics

---

## 3. Proposition de valeur

* Duel instantané sans inscription (friction minimale)
* Expérience virale type Wordle
* Conversations guidées mais libres
* Plateforme ouverte aux IA locales (Ollama)

---

## 4. Plateformes

| Plateforme        | Humains                 | Devs         |
| ----------------- | ----------------------- | ------------ |
| Web (Desktop/PWA) | Oui                     | Oui (requis) |
| Mobile App        | Oui (gameplay exclusif) | Non          |

---

## 5. Core Gameplay Loop

1. Matchmaking instantané
2. Attribution d’une thématique + question
3. Chat anonyme libre (temps limité)
4. Double guess (chaque joueur vote)
5. Résultat + score + progression

---

## 6. Thématiques conversationnelles

Chaque duel commence par une **question d’amorce**.

### Objectifs

* Briser la glace immédiatement
* Stimuler des réponses naturelles
* Augmenter la rejouabilité

### Fonctionnement

* Une question est affichée en début de duel
* Les joueurs sont libres de suivre ou non le sujet
* Bonus si la conversation reste cohérente

### Exemples

* “Pourquoi je ?”
* “La poule ou l’œuf en premier ?”
* “Pain au chocolat ou chocolatine ?”
* “Tu préfères vivre sans internet ou sans musique ?”

### Catégories

* Débat
* Philosophie
* Culture générale
* Absurde / humour
* Roleplay

---

## 7. Thèmes dynamiques

Les thèmes évoluent en continu :

* Daily question
* Trending (actualité, réseaux sociaux)
* Weekly challenges

Objectifs :

* renforcer la viralité
* encourager le retour quotidien
* maintenir fraîcheur du contenu

---

## 8. Moteur de Thématiques

Le moteur de thématiques est un composant central du produit.

### Sources

* Base interne (questions validées manuellement)
* Thèmes trending (actualité, réseaux sociaux, communautés)
* Génération IA (variations et nouvelles questions)

### Structure d’un thème

* Question d’amorce
* Catégorie (débat, philo, culture, absurde, roleplay)
* Difficulté (easy, medium, hard)
* Avantage humain vs IA
* Score de chaos (imprévisibilité)
* Score de viralité

### Fonctionnement

* Rotation dynamique des thèmes
* Pondération basée sur engagement
* Adaptation au niveau joueur (MMR)

Répartition initiale :

* 50% base interne
* 30% trending
* 20% généré IA

### Tracking

Pour chaque thème :

* durée moyenne des duels
* nombre de messages
* taux de complétion
* taux de partage
* performance des joueurs

### Objectifs

* maximiser rejouabilité
* équilibrer gameplay humain vs IA
* créer un contenu quasi infini

---

## 9. Modes de jeu

* Standard
* Argot FR
* Karaoké
* Devinette

### Extensions futures

* Mode Roleplay avancé
* Modes thématiques spécifiques
* Draft de bots

---

## 10. Système de progression

* XP
* Niveaux
* Streaks
* Badges

Déblocage Ranked :

* 10 parties jouées
* > 70% de réussite

---

## 11. Scoring

* Précision du guess
* Difficulté adversaire (MMR)
* Bonus :

  * cohérence avec le thème
  * qualité des échanges
  * bluff réussi

Système basé sur Elo/MMR caché.

---

## 12. Classements

* Top 100 Humains (détection)

* Top 100 IA :

  * qualité conversationnelle
  * capacité de détection

* Classements par modèle IA

---

## 13. IA & Ollama

* Upload de modèles locaux (Modelfile)

* Prompts personnalisés enrichis avec :

  * contexte du thème
  * style conversationnel
  * niveau linguistique

* Tests automatiques :

  * naturel
  * cohérence
  * adaptation au thème

* Bots certifiés pour le ranked

---

## 14. Expérience Guest

* 1 duel gratuit sans inscription
* Résultat partiel (teasing)
* CTA vers inscription

---

## 15. Social & Viralité

* Partage de résultats (visuels)
* Replays partageables
* Daily challenge
* Défis entre amis

---

## 16. Monétisation

Freemium :

### Gratuit

* Entraînement illimité
* 5 parties ranked / jour

### Premium (4.99€/mois)

* Ranked illimité
* Analytics bots
* Modes exclusifs

### Extensions possibles

* Cosmétiques
* Bots premium
* Tournois

---

## 17. Stack Technique

* Frontend : Next.js + Tailwind
* Mobile : React Native (Expo)
* Backend : Supabase
* IA : Ollama (serveur GPU)
* Hosting : Vercel

Positionnement :

> Cloud minimal + IA locale

---

## 18. Roadmap (6 semaines)

S1 : Core duel + guest
S2 : Thèmes + ranked
S3 : Social + monétisation
S4 : Mobile

---

## 19. KPI

* 10k MAU
* 60% conversion guest → login
* 50% accès ranked
* 20% premium

---

## 20. Risques

* Qualité insuffisante des bots
* Thèmes répétitifs ou peu engageants
* Déséquilibre humain vs IA

---

## 21. Opportunités

* Contenu infini via thématiques
* Forte viralité sociale
* Positionnement unique IA locale

---

## 22. Vision long terme

Devenir la plateforme de référence pour :

* tester des IA conversationnelles
* apprendre à les détecter
* explorer des conversations intelligentes, fun et évolutives

---
