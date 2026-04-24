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

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 text-center max-w-sm">
          <h1 className="text-3xl font-bold mb-6">Bot ou pas Bot ?</h1>
          <button 
            onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Se connecter avec GitHub
          </button>
          <p className="text-slate-500 mt-4 text-sm">Mode Anonyme bientôt disponible</p>
        </div>
      </div>
    );
  }

  const handleMatchFound = (match) => {
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
    <main className="min-h-screen">
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
