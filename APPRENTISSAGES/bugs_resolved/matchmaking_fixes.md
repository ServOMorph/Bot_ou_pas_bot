# [BUGS_RESOLVED] Supabase Matchmaking & Auth Issues

- **Domain**: core, bugs_resolved
- **Tags**: supabase, auth, matchmaking, race-condition
- **Severity**: HIGH

## Problème
1. **Conflit 409** : L'utilisation de faux UUID pour le mode invité causait des erreurs d'insertion dans Supabase.
2. **Silent Failure** : `joinMatch` échouait sans log clair quand `.single()` ne trouvait rien ou en cas de race condition.
3. **RLS Policies** : L'utilisateur B ne pouvait pas mettre à jour le match créé par l'utilisateur A.
4. **LocalStorage Context** : Deux onglets du même navigateur partagent la session `Anonymous Auth`, empêchant de tester le matchmaking seul.

## Solution
1. **Migration Auth** : Utilisation de `supabase.auth.signInAnonymously()` pour avoir de vrais comptes en base.
2. **Guards & Logs** : Utilisation de `.maybeSingle()`, ajout de guards sur `player2_id IS NULL` et logs détaillés du statut de souscription.
3. **RLS Étendu** : Ajout de policies `UPDATE` et `DELETE` autorisant les actions sur les matchs au statut `waiting`.
4. **Protocole de Test** : Tester impérativement avec 2 navigateurs différents (ex: Chrome + Firefox).

## Code (Guard Matchmaking)
```javascript
const { data, error } = await supabase
  .from('matches')
  .update({ player2_id: userId, status: 'active' })
  .eq('id', matchId)
  .eq('status', 'waiting')
  .is('player2_id', null)
  .select()
  .maybeSingle();
```

## Pièges
- Tester sur 2 onglets du même navigateur = ÉCHEC (session partagée).
- Ne pas utiliser `.is('player2_id', null)` lors de l'update = risque de race condition (2 joueurs rejoignent le même slot).
