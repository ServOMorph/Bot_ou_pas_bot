import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Loader2, Users } from 'lucide-react';

export default function WaitingRoom({ userId, onMatchFound }) {
  const [isQueueing, setIsQueueing] = useState(false);
  const [waitingCount, setWaitingCount] = useState(0);

  useEffect(() => {
    // Check for existing active match
    const checkActiveMatch = async () => {
      const { data } = await supabase
        .from('matches')
        .select('*')
        .or(`player1_id.eq.${userId},player2_id.eq.${userId}`)
        .in('status', ['active', 'voting'])
        .maybeSingle();
      
      if (data) onMatchFound(data);
    };

    checkActiveMatch();

    // Subscribe to matches to find a partner
    const channel = supabase
      .channel('matchmaking')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'matches' }, (payload) => {
        console.log('[MATCHMAKING] realtime INSERT received:', payload.new.id, 'player1:', payload.new.player1_id);
        if (payload.new.status === 'waiting' && payload.new.player1_id !== userId) {
          joinMatch(payload.new.id);
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'matches' }, (payload) => {
        console.log('[MATCHMAKING] realtime UPDATE received:', payload.new.id, 'status:', payload.new.status);
        if (payload.new.status === 'active' && (payload.new.player1_id === userId || payload.new.player2_id === userId)) {
          onMatchFound(payload.new);
        }
      })
      .subscribe((status) => {
        console.log('[MATCHMAKING] subscription status:', status);
      });

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  const startQueue = async () => {
    setIsQueueing(true);
    console.log('[MATCHMAKING] startQueue: searching for waiting match, my userId:', userId);
    const { data: waitingMatch, error: selectError } = await supabase
      .from('matches')
      .select('*')
      .eq('status', 'waiting')
      .neq('player1_id', userId)
      .limit(1)
      .maybeSingle();

    if (selectError) console.error('[MATCHMAKING] SELECT error:', selectError.code, selectError.message);
    console.log('[MATCHMAKING] SELECT result:', waitingMatch ? `found match ${waitingMatch.id}` : 'no waiting match found');

    if (waitingMatch) {
      joinMatch(waitingMatch.id);
    } else {
      const { data: insertedMatch, error } = await supabase
        .from('matches')
        .insert([{ player1_id: userId, status: 'waiting' }])
        .select()
        .maybeSingle();

      if (error) {
        console.error('[MATCHMAKING] startQueue INSERT error:', error.code, error.message);
        setIsQueueing(false);
        return;
      }
      console.log('[MATCHMAKING] startQueue: waiting match created, id:', insertedMatch?.id);
    }
  };

  const joinMatch = async (matchId) => {
    console.log('[MATCHMAKING] joinMatch called for matchId:', matchId);
    const { data, error } = await supabase
      .from('matches')
      .update({ player2_id: userId, status: 'active', timer_start: new Date().toISOString() })
      .eq('id', matchId)
      .eq('status', 'waiting')
      .is('player2_id', null)
      .select()
      .maybeSingle();

    if (error) {
      console.error('[MATCHMAKING] joinMatch error:', error.code, error.message);
      setIsQueueing(false);
      return;
    }
    if (!data) {
      console.warn('[MATCHMAKING] joinMatch: match already claimed or not found, id:', matchId);
      return;
    }
    console.log('[MATCHMAKING] joinMatch success, match id:', data.id);
    onMatchFound(data);
  };

  const cancelQueue = async () => {
    console.log('[MATCHMAKING] User cancelled queue');
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('player1_id', userId)
      .eq('status', 'waiting')
      .is('player2_id', null);

    if (error) console.error('[MATCHMAKING] cancelQueue error:', error.code, error.message);
    setIsQueueing(false);
  };

  const startBotMatch = async () => {
    console.log("🚀 [MATCHMAKING] Initialisation d'un duel contre le Bot...");
    setIsQueueing(true);
    
    const botId = import.meta.env.VITE_BOT_USER_ID;
    console.log("📡 [SUPABASE] Création de la ligne de match avec Bot ID:", botId);

    const { data, error } = await supabase
      .from('matches')
      .insert([
        { 
          player1_id: userId, 
          player2_id: botId, 
          status: 'active', 
          timer_start: new Date().toISOString() 
        }
      ])
      .select()
      .maybeSingle();
    
    if (error) {
      console.error("❌ [SUPABASE] Erreur lors de la création du match:", error);
      setIsQueueing(false);
      return;
    }

    if (data) {
      console.log("✅ [MATCHMAKING] Match créé avec succès ! ID:", data.id);
      console.log("➡️ [NAVIGATION] Passage à l'écran de Duel...");
      onMatchFound(data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-white text-center">
      <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-md w-full">
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-indigo-500/20 rounded-full">
            <Users className="w-12 h-12 text-indigo-400" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-2">Bot ou pas Bot ?</h2>
        <p className="text-slate-400 mb-8">Duel de 3 minutes. Démasquez votre adversaire.</p>

        {isQueueing ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin" style={{ color: '#ff8c42' }} />
            <p className="font-medium animate-pulse" style={{ color: '#f0e6d8' }}>
              Recherche d&apos;un adversaire...
            </p>
            <button
              onClick={cancelQueue}
              className="mt-2 px-6 py-2 rounded-xl font-semibold text-sm transition-all active:scale-95"
              style={{ border: '1px solid #ff8c42', color: '#ff8c42', background: 'transparent' }}
            >
              Annuler
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              onClick={startQueue}
              className="w-full py-4 px-8 bg-indigo-600 hover:bg-indigo-500 transition-all rounded-2xl font-bold text-lg shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              Lancer un Duel Humain
            </button>
            <button
              onClick={startBotMatch}
              className="w-full py-4 px-8 bg-slate-700 hover:bg-slate-600 transition-all rounded-2xl font-bold text-lg border border-slate-600 active:scale-95"
            >
              Défier le Bot (Ollama)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
