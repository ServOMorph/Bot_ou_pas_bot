import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Send, Timer, ShieldAlert } from 'lucide-react';
import { formatDistanceToNow, differenceInSeconds } from 'date-fns';

export default function ChatDuel({ match, userId, onTimeUp }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const scrollRef = useRef();

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      console.log("📥 [CHAT] Récupération de l'historique des messages...");
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('match_id', match.id)
        .order('created_at', { ascending: true });
      if (data) {
        console.log(`✅ [CHAT] ${data.length} messages récupérés.`);
        setMessages(data);
      }
    };
    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`match:${match.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `match_id=eq.${match.id}` }, (payload) => {
        console.log("📩 [REALTIME] Nouveau message reçu:", payload.new.text);
        setMessages(prev => [...prev, payload.new]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'matches', filter: `id=eq.${match.id}` }, (payload) => {
        console.log("🔄 [REALTIME] Mise à jour du match:", payload.new.status);
        if (payload.new.status === 'voting') onTimeUp();
      })
      .subscribe((status) => {
        console.log("📡 [REALTIME] Statut de connexion au canal:", status);
      });

    // Timer logic
    const timer = setInterval(() => {
      const secondsPassed = differenceInSeconds(new Date(), new Date(match.timer_start));
      const remaining = Math.max(0, 180 - secondsPassed);
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        clearInterval(timer);
        endChat();
      }
    }, 1000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(timer);
    };
  }, [match.id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const endChat = async () => {
    await supabase.from('matches').update({ status: 'voting' }).eq('id', match.id);
    onTimeUp();
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText;
    setInputText('');

    console.log("📤 [CHAT] Envoi du message:", text);
    const { error } = await supabase.from('messages').insert([
      { match_id: match.id, user_id: userId, text }
    ]);

    if (error) {
      console.error("❌ [CHAT] Erreur lors de l'envoi:", error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-[90vh] max-w-2xl mx-auto bg-slate-900 border-x border-slate-800 shadow-2xl">
      {/* Header */}
      <div className="p-4 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="font-bold text-slate-200">Duel Anonyme</span>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${timeLeft < 30 ? 'bg-red-500/20 text-red-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
          <Timer className="w-4 h-4" />
          <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.user_id === userId ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
              msg.user_id === userId 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className="text-[10px] opacity-50 mt-1 text-right">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 bg-slate-800/50 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 p-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}
