import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Cpu, User, CheckCircle2 } from 'lucide-react';

export default function VoteScreen({ match, userId, onComplete }) {
  const [hasVoted, setHasVoted] = useState(false);
  const isPlayer1 = match.player1_id === userId;

  const handleVote = async (choice) => {
    const updateData = isPlayer1 ? { vote1: choice } : { vote2: choice };
    
    const { error } = await supabase
      .from('matches')
      .update(updateData)
      .eq('id', match.id);

    if (!error) {
      setHasVoted(true);
      // Check if both have voted to end (simplified for MVP)
      setTimeout(() => onComplete(), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-white text-center">
      <div className="bg-slate-800/50 backdrop-blur-xl p-10 rounded-3xl border border-slate-700 shadow-2xl max-w-lg w-full">
        <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
          Temps écoulé !
        </h2>
        
        {!hasVoted ? (
          <>
            <p className="text-slate-400 mb-10 text-lg">Votre adversaire était-il une IA ?</p>
            
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => handleVote('human')}
                className="group flex flex-col items-center gap-4 p-6 bg-slate-900/50 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500/50 rounded-2xl transition-all"
              >
                <div className="p-4 bg-emerald-500/10 group-hover:bg-emerald-500/20 rounded-full transition-colors">
                  <User className="w-10 h-10 text-emerald-400" />
                </div>
                <span className="font-bold text-emerald-400">HUMAIN</span>
              </button>

              <button
                onClick={() => handleVote('bot')}
                className="group flex flex-col items-center gap-4 p-6 bg-slate-900/50 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/50 rounded-2xl transition-all"
              >
                <div className="p-4 bg-rose-500/10 group-hover:bg-rose-500/20 rounded-full transition-colors">
                  <Cpu className="w-10 h-10 text-rose-400" />
                </div>
                <span className="font-bold text-rose-400">BOT (IA)</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 py-10">
            <div className="p-4 bg-indigo-500/20 rounded-full">
              <CheckCircle2 className="w-16 h-16 text-indigo-400 animate-bounce" />
            </div>
            <div>
              <p className="text-2xl font-bold">Vote enregistré !</p>
              <p className="text-slate-400 mt-2">Calcul des résultats en cours...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
