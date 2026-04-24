Voici le **prochain document** à donner aux devs : les **User Stories**, structurées pour le MVP de **Bot ou pas Bot ?**. Elles découlent directement de la SPEC produit et permettent de découper le travail en tickets clairs. [perplexity](https://www.perplexity.ai/search/0fb0a566-01cf-4937-acad-1bdb8f595a8b)

```md
# User Stories — Bot ou pas Bot ? (MVP)

## Contexte
Ces user stories décrivent les fonctionnalités essentielles pour lancer le MVP. Chaque story suit le format : **En tant que [rôle], je veux [fonctionnalité] afin de [bénéfice]**.  
Priorité : P1 (MVP critique), P2 (MVP nice-to-have), P3 (post-MVP).  
Critères d'acceptation listés pour chaque.

## 1. Inscription et authentification (P1)
**En tant que visiteur, je veux m'inscrire rapidement pour commencer à jouer.**  
**Critères d'acceptation :**  
- Formulaire email/mot de passe ou Google/Apple.  
- Confirmation email optionnelle.  
- Choix de rôle : Joueur / Développeur (pour bots custom).  
- Profil minimal créé.

**En tant qu'utilisateur, je veux me connecter/déconnecter facilement.**  
**Critères d'acceptation :**  
- Bouton login persistant.  
- Session sécurisée (JWT ou équivalent).

## 2. Lancement de duel (P1)
**En tant que joueur, je veux lancer un duel pour affronter un interlocuteur anonyme.**  
**Critères d'acceptation :**  
- Bouton "Lancer un duel" homepage.  
- Matching instantané (humain ou bot).  
- Interface chat simple (input + send + messages).  
- Timer par duel (ex. 2-5 min).  
- Anonymat total (pas de pseudo visible).

## 3. Jeu du duel (P1)
**En tant que joueur, je veux converser et analyser mon interlocuteur.**  
**Critères d'acceptation :**  
- Chat en temps réel (WebSocket).  
- Messages texte uniquement.  
- Mode français exclusif.  
- Option "arrêt anticipé".

**En tant que joueur, je veux deviner si mon partenaire est humain ou bot.**  
**Critères d'acceptation :**  
- Bouton "Humain" / "Bot" en fin de duel.  
- Feedback immédiat : résultat + explication.  
- Score gagné/perdu affiché.

## 4. Système de score et progression (P1)
**En tant que joueur, je veux voir mon score après chaque duel.**  
**Critères d'acceptation :**  
- Score = points par bonne réponse (ex. +10, -5).  
- Streak (série de victoires).  
- Niveau / Rang calculé.

## 5. Classement (P1)
**En tant que joueur, je veux voir le classement pour me comparer.**  
**Critères d'acceptation :**  
- Top 100 global.  
- Mon rang personnel.  
- Filtres : hebdo / global.  
- Mise à jour temps réel.

**En tant que joueur, je veux partager mon résultat.**  
**Critères d'acceptation :**  
- Bouton partage Twitter / TikTok / Image.  
- Score + screenshot duel.

## 6. Bots custom (P2)
**En tant que développeur, je veux uploader un bot custom.**  
**Critères d'acceptation :**  
- Formulaire upload (script simple ou API).  
- Validation sécurité.  
- Bot actif en matching.  
- Dashboard stats (XP, victoires).

## 7. Admin basique (P2)
**En tant qu'admin, je veux modérer les bots.**  
**Critères d'acceptation :**  
- Liste bots à valider.  
- Ban / stats.

## 8. Pages statiques (P1)
**En tant que visiteur, je veux découvrir le produit.**  
**Critères d'acceptation :**  
- Homepage avec CTA.  
- Page règles.  
- Page classements publics.

## Backlog priorisé (MVP ~4-6 semaines)
1. Inscription + Duel basique.
2. Score + Classement.
3. Partage.
4. Bots custom (basique).
5. Polish UX + Admin.

