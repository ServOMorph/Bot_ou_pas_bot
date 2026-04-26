// test_matchmaking.js — Integration test for matchmaking (2 anonymous users)
// Usage (Node 20+): node --env-file=.env SCRIPTS/test_matchmaking.js
// Usage (Node 18) : npx dotenv -e .env -- node SCRIPTS/test_matchmaking.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('[ERR] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const clientA = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const clientB = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function signInAnon(client, label) {
  const { data, error } = await client.auth.signInAnonymously();
  if (error) { console.error(`[ERR] ${label} signInAnonymously:`, error.message); process.exit(1); }
  console.log(`[OK] ${label} signed in, uid: ${data.user.id}`);
  return data.user.id;
}

async function userAInsert(client, userId) {
  console.log('[...] User A: inserting waiting match');
  const { data, error } = await client
    .from('matches')
    .insert([{ player1_id: userId, status: 'waiting' }])
    .select()
    .maybeSingle();
  if (error) { console.error('[ERR] User A INSERT:', error.code, error.message); return null; }
  console.log('[OK] User A: waiting match created, id:', data.id);
  return data;
}

async function userBJoin(client, userId, matchId) {
  console.log('[...] User B: joining match id:', matchId);
  const { data, error } = await client
    .from('matches')
    .update({ player2_id: userId, status: 'active', timer_start: new Date().toISOString() })
    .eq('id', matchId)
    .eq('status', 'waiting')
    .is('player2_id', null)
    .select()
    .maybeSingle();
  if (error) { console.error('[ERR] User B UPDATE:', error.code, error.message); return null; }
  if (!data) { console.error('[ERR] User B UPDATE: 0 rows matched — RLS policy blocks joiner or race'); return null; }
  console.log('[OK] User B: joined successfully, status:', data.status);
  return data;
}

async function verifyBothSeeActive(matchId) {
  const { data: rowA } = await clientA.from('matches').select('status').eq('id', matchId).maybeSingle();
  const { data: rowB } = await clientB.from('matches').select('status').eq('id', matchId).maybeSingle();
  const aOk = rowA?.status === 'active';
  const bOk = rowB?.status === 'active';
  console.log(aOk ? '[OK] Client A sees status=active' : '[ERR] Client A status: ' + rowA?.status);
  console.log(bOk ? '[OK] Client B sees status=active' : '[ERR] Client B status: ' + rowB?.status);
  return aOk && bOk;
}

async function cleanup(matchId) {
  await clientA.from('matches').delete().eq('id', matchId);
  console.log('[OK] Cleanup: test match deleted');
}

async function run() {
  console.log('--- Matchmaking Integration Test ---');
  const userAId = await signInAnon(clientA, 'User A');
  const userBId = await signInAnon(clientB, 'User B');

  const matchRow = await userAInsert(clientA, userAId);
  if (!matchRow) { console.error('[ERR] Test aborted.'); process.exit(1); }

  await new Promise(r => setTimeout(r, 500));

  const joinedRow = await userBJoin(clientB, userBId, matchRow.id);
  if (!joinedRow) {
    await cleanup(matchRow.id);
    console.error('[ERR] Test FAILED: check RLS UPDATE policy in Supabase Dashboard');
    process.exit(1);
  }

  const passed = await verifyBothSeeActive(matchRow.id);
  await cleanup(matchRow.id);

  if (passed) {
    console.log('[OK] MATCHMAKING TEST PASSED');
  } else {
    console.error('[ERR] MATCHMAKING TEST FAILED');
    process.exit(1);
  }
}

run().catch(err => { console.error('[ERR] Unhandled:', err); process.exit(1); });
