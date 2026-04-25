# 📚 Glossaire Technique - Bot ou pas Bot ?

Ce document répertorie les termes techniques et les concepts clés utilisés dans le projet.

## 🤖 Intelligence Artificielle & Agents

1.  **Agent IA** : Entité logicielle autonome basée sur un LLM, configurée pour une tâche spécifique (ex: Quali pour les tests).
2.  **ChefIA** : Agent de niveau 1 (Opus) responsable de l'orchestration globale et de la validation des phases.
3.  **Pyramide des 100** : Structure hiérarchique de l'équipe IA comprenant 1 Chef, 9 Experts (Niv 2), et 90 Sous-agents (Niv 3 & 4).
4.  **Fallback Chain** : Mécanisme de repli automatique vers un modèle moins puissant si le modèle principal est indisponible (ex: Opus -> Sonnet -> Gemini).
5.  **Ollama** : Serveur local permettant de faire tourner des LLM (comme Llama 3.1) sans dépendance cloud.
6.  **Bridge Ollama** : Script Python faisant le pont entre les messages en base de données (Supabase) et l'IA locale.
7.  **Prompt Engineering** : L'art de structurer les instructions envoyées aux agents pour obtenir un résultat précis.

## 🎮 Game Design & Mécaniques

8.  **Arène de Turing** : Le concept central du jeu où un humain affronte un adversaire anonyme (Bot ou Humain).
9.  **Verdict de Turing** : Action finale du joueur consistant à voter pour identifier la nature de son adversaire.
10. **Matchmaking** : Système de mise en relation des joueurs dans une file d'attente pour créer un duel.
11. **ELO System** : Système de classement des joueurs et des bots basé sur leurs performances (victoires/défaites).
12. **AutoAntigravity** : Outil d'automatisation et de test (clicker + capture) utilisé pour simuler des comportements.
13. **Waiting Room** : Interface où les joueurs patientent avant qu'un match ne soit trouvé.

## 💻 Stack Technique & Infrastructure

14. **Supabase** : Plateforme Backend-as-a-Service (BaaS) utilisant PostgreSQL, gérant l'auth et le temps réel.
15. **Realtime DB** : Fonctionnalité de Supabase permettant de recevoir des notifications instantanées lors de changements en base de données.
16. **RLS (Row Level Security)** : Politiques de sécurité au niveau des lignes SQL pour restreindre l'accès aux données.
17. **Vite** : Outil de build ultra-rapide utilisé pour le frontend React.
18. **Vanilla CSS** : Utilisation du CSS pur sans frameworks (comme Tailwind), privilégiée pour ce projet pour un contrôle total.
19. **Anonymous Auth** : Système permettant aux utilisateurs de jouer sans créer de compte, via des sessions temporaires.
20. **JWT (JSON Web Token)** : Jeton sécurisé utilisé pour authentifier les requêtes entre le frontend et Supabase.

## 📋 Gestion de Projet

21. **DoD (Definition of Done)** : Liste de critères à remplir pour qu'une tâche soit officiellement considérée comme terminée.
22. **Phase (P0, P1, etc.)** : Groupe de tâches cohérentes dans la roadmap (ex: P0 = Infrastructure).
23. **Output** : Fichier, rapport ou code généré par un agent à l'issue d'une session ou d'une phase.
24. **Scribe** : Rôle de l'agent responsable de la maintenance documentaire et de l'intégrité des templates.

---
*Dernière mise à jour : 2026-04-25*
