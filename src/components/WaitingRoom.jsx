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
        .single();
      
      if (data) onMatchFound(data);
    };

    checkActiveMatch();

    // Subscribe to matches to find a partner
    const channel = supabase
      .channel('matchmaking')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'matches' }, (payload) => {
        if (payload.new.status === 'waiting' && payload.new.player1_id !== userId) {
          joinMatch(payload.new.id);
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'matches' }, (payload) => {
        if (payload.new.status === 'active' && (payload.new.player1_id === userId || payload.new.player2_id === userId)) {
          onMatchFound(payload.new);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  const startQueue = async () => {
    setIsQueueing(true);
    // Try to find a waiting match first
    const { data: waitingMatch } = await supabase
      .from('matches')
      .select('*')
      .eq('status', 'waiting')
      .neq('player1_id', userId)
      .limit(1)
      .single();

    if (waitingMatch) {
      joinMatch(waitingMatch.id);
    } else {
      // Create new waiting match
      await supabase.from('matches').insert([
        { player1_id: userId, status: 'waiting' }
      ]);
    }
  };

  const joinMatch = async (matchId) => {
    const { data } = await supabase
      .from('matches')
      .update({ player2_id: userId, status: 'active', timer_start: new Date().toISOString() })
      .eq('id', matchId)
      .select()
      .single();
    
    if (data) onMatchFound(data);
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
            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
            <p className="font-medium animate-pulse">Recherche d'un adversaire...</p>
          </div>
        ) : (
          <button
            onClick={startQueue}
            className="w-full py-4 px-8 bg-indigo-600 hover:bg-indigo-500 transition-all rounded-2xl font-bold text-lg shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            Lancer un Duel
          </button>
        )}
      </div>
    </div>
  );
}
