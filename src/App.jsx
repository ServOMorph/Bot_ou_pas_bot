import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import WaitingRoom from './components/WaitingRoom';
import ChatDuel from './components/ChatDuel';
import VoteScreen from './components/VoteScreen';

export default function App() {
  const [session, setSession] = useState(null);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [view, setView] = useState('waiting'); // 'waiting', 'chat', 'vote'

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const loginAsGuest = async () => {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) console.error("❌ [AUTH] Invité:", error);
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 text-center max-w-sm w-full">
          <h1 className="text-3xl font-bold mb-6 text-white">Bot ou pas Bot ?</h1>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
              className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Se connecter avec GitHub
            </button>
            <button 
              onClick={loginAsGuest}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-colors"
            >
              Mode Invité (Test Rapide)
            </button>
          </div>
          <p className="text-slate-500 mt-4 text-sm italic">Pas de configuration requise</p>
        </div>
      </div>
    );
  }

  const handleMatchFound = (match) => {
    console.log("🎮 [APP] Match détecté ! Passage en vue ChatDuel. MatchID:", match.id);
    setCurrentMatch(match);
    setView('chat');
  };

  const handleTimeUp = () => {
    setView('vote');
  };

  const handleVoteComplete = () => {
    setCurrentMatch(null);
    setView('waiting');
  };

  return (
    <main className="app-container">
      {view === 'waiting' && (
        <WaitingRoom 
          userId={session.user.id} 
          onMatchFound={handleMatchFound} 
        />
      )}
      
      {view === 'chat' && currentMatch && (
        <ChatDuel 
          match={currentMatch} 
          userId={session.user.id} 
          onTimeUp={handleTimeUp} 
        />
      )}

      {view === 'vote' && currentMatch && (
        <VoteScreen 
          match={currentMatch} 
          userId={session.user.id} 
          onComplete={handleVoteComplete} 
        />
      )}
    </main>
  );
}
