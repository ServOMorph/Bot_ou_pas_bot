-- SCHEMA DATABASE SUPABASE
-- Bot ou pas Bot ? MVP

-- 1. Table Matches
CREATE TABLE IF NOT EXISTS public.matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    player1_id UUID REFERENCES auth.users(id),
    player2_id UUID REFERENCES auth.users(id),
    status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'voting', 'ended')),
    timer_start TIMESTAMPTZ,
    vote1 TEXT CHECK (vote1 IN ('human', 'bot')),
    vote2 TEXT CHECK (vote2 IN ('human', 'bot'))
);

-- 2. Table Messages
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_human BOOLEAN DEFAULT TRUE
);

-- 3. Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.matches;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- RLS (Security) - Simple version for MVP
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Matches are visible to everyone" ON public.matches FOR SELECT USING (true);
CREATE POLICY "Users can create matches" ON public.matches FOR INSERT WITH CHECK (auth.uid() = player1_id);
CREATE POLICY "Users can update their matches" ON public.matches FOR UPDATE USING (auth.uid() = player1_id OR auth.uid() = player2_id);

CREATE POLICY "Messages are visible to match participants" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = user_id);
