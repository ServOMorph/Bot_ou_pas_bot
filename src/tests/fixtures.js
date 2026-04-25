export const mockPlayers = {
  human: {
    id: 'h1',
    display_name: 'Player One',
    is_bot: false,
    elo: 1200
  },
  bot: {
    id: 'b1',
    display_name: 'LlamaBot',
    is_bot: true,
    elo: 1500
  }
};

export const mockMatches = [
  {
    id: 'm1',
    player1_id: 'h1',
    player2_id: null,
    status: 'waiting',
    created_at: new Date().toISOString()
  },
  {
    id: 'm2',
    player1_id: 'h1',
    player2_id: 'b1',
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: 'm3',
    player1_id: 'h1',
    player2_id: 'h2',
    status: 'finished',
    winner_id: 'h1',
    created_at: new Date().toISOString()
  }
];

export const mockMessages = [
  {
    id: 'msg1',
    match_id: 'm2',
    sender_id: 'h1',
    content: 'Salut le bot !',
    created_at: new Date().toISOString()
  },
  {
    id: 'msg2',
    match_id: 'm2',
    sender_id: 'b1',
    content: 'Bonjour humain. Je suis prêt pour le test.',
    created_at: new Date().toISOString()
  }
];

export const mockStats = {
  total_duels: 42,
  human_wins: 20,
  bot_wins: 22,
  turing_success_rate: 0.65
};

export const mockBotConfig = {
  model: 'llama3.1:8b',
  temperature: 0.7,
  system_prompt: 'Tu es un joueur humain de 25 ans, un peu sarcastique.'
};
