// Shared primitives, tokens, CSS injection for all 4 screens.
// Declared in window so other babel scripts can access.

const TOKENS = {
  bg: '#050705',
  bgElev: '#0b0f0c',
  bgCard: '#0f1411',
  line: 'rgba(0, 255, 136, 0.14)',
  lineStrong: 'rgba(0, 255, 136, 0.35)',
  neon: '#00ff88',
  neonDim: '#00c46a',
  neonGlow: 'rgba(0, 255, 136, 0.4)',
  magenta: '#ff2d95',
  cyan: '#00e0ff',
  amber: '#ffb020',
  red: '#ff4545',
  text: '#e8ffe8',
  textMute: '#7a8a7e',
  textDim: '#4a5a4e',
  display: "'Orbitron', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
  body: "'Space Grotesk', system-ui, sans-serif",
};

// One-time styles for scanlines, glitch, shared effects
if (typeof document !== 'undefined' && !document.getElementById('bob-styles')) {
  const s = document.createElement('style');
  s.id = 'bob-styles';
  s.textContent = `
    .bob-screen {
      position: relative;
      width: 100%;
      height: 100%;
      background: ${TOKENS.bg};
      color: ${TOKENS.text};
      font-family: ${TOKENS.body};
      overflow: hidden;
    }
    .bob-scanlines::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 255, 136, 0.025) 0px,
        rgba(0, 255, 136, 0.025) 1px,
        transparent 1px,
        transparent 3px
      );
      pointer-events: none;
      z-index: 100;
    }
    .bob-scanlines::after {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%);
      pointer-events: none;
      z-index: 101;
    }
    .bob-grid-bg {
      background-image:
        linear-gradient(${TOKENS.line} 1px, transparent 1px),
        linear-gradient(90deg, ${TOKENS.line} 1px, transparent 1px);
      background-size: 40px 40px;
      background-position: -1px -1px;
    }
    .bob-glitch {
      font-family: ${TOKENS.display};
      font-weight: 900;
      letter-spacing: 0.02em;
      color: ${TOKENS.neon};
      text-shadow:
        0 0 8px ${TOKENS.neonGlow},
        0 0 22px rgba(0, 255, 136, 0.25);
      position: relative;
      display: inline-block;
    }
    .bob-glitch::before,
    .bob-glitch::after {
      content: attr(data-text);
      position: absolute;
      top: 0; left: 0; right: 0;
      pointer-events: none;
      opacity: 0.7;
    }
    .bob-glitch::before {
      color: ${TOKENS.magenta};
      transform: translate(-2px, 0);
      clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
      mix-blend-mode: screen;
      animation: bob-glitch-a 3.2s infinite steps(1);
    }
    .bob-glitch::after {
      color: ${TOKENS.cyan};
      transform: translate(2px, 0);
      clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
      mix-blend-mode: screen;
      animation: bob-glitch-b 2.6s infinite steps(1);
    }
    @keyframes bob-glitch-a {
      0%, 92%, 100% { transform: translate(-2px, 0); }
      93% { transform: translate(-4px, -1px); }
      95% { transform: translate(-1px, 1px); }
      97% { transform: translate(-3px, 0); }
    }
    @keyframes bob-glitch-b {
      0%, 88%, 100% { transform: translate(2px, 0); }
      89% { transform: translate(4px, 1px); }
      91% { transform: translate(1px, -1px); }
      94% { transform: translate(3px, 0); }
    }
    @keyframes bob-pulse {
      0%, 100% { opacity: 1; box-shadow: 0 0 0 0 ${TOKENS.neonGlow}; }
      50% { opacity: 0.85; box-shadow: 0 0 0 8px rgba(0,255,136,0); }
    }
    @keyframes bob-blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .bob-blink { animation: bob-blink 1s infinite; }
    @keyframes bob-typing {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-3px); opacity: 1; }
    }
    @keyframes bob-marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    .bob-btn-primary {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 16px 28px;
      background: ${TOKENS.neon};
      color: #000;
      font-family: ${TOKENS.display};
      font-weight: 800;
      font-size: 15px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
      box-shadow: 0 0 30px ${TOKENS.neonGlow};
    }
    .bob-btn-ghost {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 18px;
      background: transparent;
      color: ${TOKENS.neon};
      font-family: ${TOKENS.mono};
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border: 1px solid ${TOKENS.lineStrong};
      cursor: pointer;
    }
    .bob-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      background: rgba(0, 255, 136, 0.08);
      color: ${TOKENS.neon};
      font-family: ${TOKENS.mono};
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border: 1px solid ${TOKENS.line};
    }
    .bob-dot-live {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${TOKENS.neon};
      box-shadow: 0 0 8px ${TOKENS.neon};
      animation: bob-pulse 1.8s infinite;
    }
  `;
  document.head.appendChild(s);
}

// Device frame — browser chrome with dark theme
function BrowserChrome({ url, children }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#0a0a0a',
      border: `1px solid ${TOKENS.line}`,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{
        height: 38,
        background: '#060806',
        borderBottom: `1px solid ${TOKENS.line}`,
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '0 14px', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.5 }} />
          ))}
        </div>
        <div style={{
          flex: 1, height: 22,
          background: '#0f1411',
          border: `1px solid ${TOKENS.line}`,
          display: 'flex', alignItems: 'center',
          padding: '0 10px', gap: 8,
          fontFamily: TOKENS.mono, fontSize: 11, color: TOKENS.textMute,
          marginRight: 90,
        }}>
          <span style={{ color: TOKENS.neon }}>●</span>
          <span style={{ color: TOKENS.textDim }}>https://</span>
          <span style={{ color: TOKENS.text }}>{url}</span>
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

// Top nav bar shared across screens
function TopNav({ active, streak = 7, points = 1240 }) {
  const items = ['DUEL', 'CLASSEMENT', 'HISTORIQUE', 'À PROPOS'];
  return (
    <div style={{
      height: 56, flexShrink: 0,
      borderBottom: `1px solid ${TOKENS.line}`,
      background: 'rgba(6, 8, 6, 0.9)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center',
      padding: '0 28px', gap: 32,
      position: 'relative', zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 26, height: 26,
          background: TOKENS.neon,
          clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
          boxShadow: `0 0 12px ${TOKENS.neonGlow}`,
        }}/>
        <div style={{
          fontFamily: TOKENS.display, fontWeight: 900,
          fontSize: 15, letterSpacing: '0.08em',
          color: TOKENS.text,
        }}>
          BOT<span style={{ color: TOKENS.neon }}>/</span>PAS BOT
        </div>
      </div>
      <div style={{ display: 'flex', gap: 2, flex: 1 }}>
        {items.map(it => (
          <div key={it} style={{
            padding: '8px 14px',
            fontFamily: TOKENS.mono, fontSize: 11, fontWeight: 600,
            letterSpacing: '0.12em',
            color: it === active ? TOKENS.neon : TOKENS.textMute,
            borderBottom: it === active ? `2px solid ${TOKENS.neon}` : '2px solid transparent',
            cursor: 'pointer',
          }}>
            {it}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: TOKENS.mono, fontSize: 12,
          color: TOKENS.amber,
        }}>
          <span style={{ fontSize: 14 }}>🔥</span>
          <span style={{ fontWeight: 700 }}>{streak}</span>
          <span style={{ color: TOKENS.textDim, fontSize: 10 }}>STREAK</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '5px 10px',
          border: `1px solid ${TOKENS.line}`,
          fontFamily: TOKENS.mono, fontSize: 12,
          color: TOKENS.neon, fontWeight: 700,
        }}>
          <span style={{ color: TOKENS.textDim, fontSize: 10, marginRight: 2 }}>PTS</span>
          {points.toLocaleString('fr-FR')}
        </div>
        <div style={{
          width: 32, height: 32,
          border: `1px solid ${TOKENS.lineStrong}`,
          background: `linear-gradient(135deg, ${TOKENS.bgElev}, ${TOKENS.bg})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: TOKENS.mono, fontSize: 11, fontWeight: 700,
          color: TOKENS.neon,
        }}>
          M7
        </div>
      </div>
    </div>
  );
}

// Corner brackets decoration
function Brackets({ size = 14, color, style }) {
  const c = color || TOKENS.lineStrong;
  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: size, height: size, borderTop: `1px solid ${c}`, borderLeft: `1px solid ${c}`, ...style }}/>
      <div style={{ position: 'absolute', top: 0, right: 0, width: size, height: size, borderTop: `1px solid ${c}`, borderRight: `1px solid ${c}`, ...style }}/>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: size, height: size, borderBottom: `1px solid ${c}`, borderLeft: `1px solid ${c}`, ...style }}/>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: size, height: size, borderBottom: `1px solid ${c}`, borderRight: `1px solid ${c}`, ...style }}/>
    </>
  );
}

Object.assign(window, { TOKENS, BrowserChrome, TopNav, Brackets });
