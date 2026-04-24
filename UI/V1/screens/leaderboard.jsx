// Screen 4: Leaderboard — top 100 global, mon rang, filtres hebdo

function Leaderboard() {
  const players = [
    { r: 1, n: 'NinaLyon', pts: 18240, w: 412, l: 98, acc: 80.8, streak: 47, flag: '🇫🇷', badge: '👑' },
    { r: 2, n: 'kev_94', pts: 17105, w: 398, l: 112, acc: 78.0, streak: 31, flag: '🇫🇷' },
    { r: 3, n: 'captaincroissant', pts: 16890, w: 376, l: 102, acc: 78.7, streak: 28, flag: '🇨🇭' },
    { r: 4, n: 'zoé.mtl', pts: 15420, w: 340, l: 110, acc: 75.6, streak: 19, flag: '🇨🇦' },
    { r: 5, n: 'xX_frichti_Xx', pts: 14998, w: 322, l: 98, acc: 76.7, streak: 12, flag: '🇫🇷' },
    { r: 6, n: 'brkchr', pts: 14120, w: 310, l: 124, acc: 71.4, streak: 8, flag: '🇧🇪' },
    { r: 7, n: 'lou.2002', pts: 13842, w: 295, l: 121, acc: 70.9, streak: 22, flag: '🇫🇷' },
    { r: 8, n: 'jparledauphin', pts: 12987, w: 278, l: 108, acc: 72.0, streak: 5, flag: '🇫🇷' },
    { r: 9, n: 'mo.el.mag', pts: 12445, w: 270, l: 112, acc: 70.7, streak: 14, flag: '🇲🇦' },
    { r: 10, n: 'paulopoulet', pts: 11998, w: 258, l: 102, acc: 71.7, streak: 9, flag: '🇫🇷' },
    { r: 11, n: 'salim_dz', pts: 11540, w: 246, l: 110, acc: 69.1, streak: 7, flag: '🇩🇿' },
    { r: 12, n: 'fanny.ptt', pts: 10980, w: 230, l: 98, acc: 70.1, streak: 3, flag: '🇫🇷' },
    { r: 13, n: 'tonio.brx', pts: 10620, w: 222, l: 104, acc: 68.1, streak: 11, flag: '🇧🇪' },
  ];

  return (
    <div className="bob-screen bob-scanlines">
      <TopNav active="CLASSEMENT"/>

      <div style={{
        position: 'absolute',
        top: 56, bottom: 0, left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header area */}
        <div style={{
          padding: '28px 48px 16px',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: TOKENS.mono, fontSize: 11, fontWeight: 600,
              letterSpacing: '0.2em', color: TOKENS.neon,
            }}>// GLOBAL · SEMAINE 17</div>
            <h1 style={{
              margin: '8px 0 0',
              fontFamily: TOKENS.display, fontWeight: 900,
              fontSize: 52, letterSpacing: '-0.01em',
              color: TOKENS.text,
            }}>
              TOP <span className="bob-glitch" data-text="100">100</span> CHASSEURS
            </h1>
            <div style={{
              marginTop: 8,
              fontFamily: TOKENS.body, fontSize: 14,
              color: TOKENS.textMute,
            }}>
              Les meilleurs démasqueurs d'IA de la francophonie. Reset tous les dimanches à minuit.
            </div>
          </div>

          {/* Countdown */}
          <div style={{
            padding: '14px 22px',
            border: `1px solid ${TOKENS.line}`,
            background: TOKENS.bgElev,
            textAlign: 'right',
          }}>
            <div style={{
              fontFamily: TOKENS.mono, fontSize: 10,
              color: TOKENS.textMute, letterSpacing: '0.2em',
            }}>FIN DE SAISON DANS</div>
            <div style={{
              fontFamily: TOKENS.display, fontWeight: 800,
              fontSize: 26, color: TOKENS.neon,
              marginTop: 4, letterSpacing: '0.04em',
            }}>
              02<span style={{ color: TOKENS.textDim }}>j</span> 14<span style={{ color: TOKENS.textDim }}>h</span> 38<span style={{ color: TOKENS.textDim }}>m</span>
            </div>
          </div>
        </div>

        {/* Filters bar */}
        <div style={{
          padding: '0 48px 16px',
          display: 'flex', alignItems: 'center', gap: 24,
        }}>
          <div style={{ display: 'flex', gap: 0 }}>
            {['HEBDO', 'MENSUEL', 'SAISON', 'ALL-TIME'].map((f, i) => (
              <div key={f} style={{
                padding: '10px 18px',
                border: `1px solid ${TOKENS.line}`,
                borderLeft: i === 0 ? `1px solid ${TOKENS.line}` : 'none',
                background: i === 0 ? 'rgba(0, 255, 136, 0.06)' : 'transparent',
                color: i === 0 ? TOKENS.neon : TOKENS.textMute,
                fontFamily: TOKENS.mono, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.12em', cursor: 'pointer',
              }}>
                {f}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['🌍 Global', '🇫🇷 France', '🇧🇪 BE', '🇨🇦 CA', '🇨🇭 CH'].map((f, i) => (
              <div key={f} style={{
                padding: '8px 14px',
                border: `1px solid ${i === 0 ? TOKENS.lineStrong : TOKENS.line}`,
                background: i === 0 ? 'rgba(0, 255, 136, 0.04)' : 'transparent',
                color: i === 0 ? TOKENS.text : TOKENS.textMute,
                fontFamily: TOKENS.mono, fontSize: 11,
                cursor: 'pointer',
              }}>
                {f}
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 14px',
            border: `1px solid ${TOKENS.line}`,
            background: TOKENS.bgElev,
            width: 220,
          }}>
            <span style={{ color: TOKENS.textDim, fontSize: 12 }}>⌕</span>
            <input
              placeholder="Chercher un pseudo..."
              style={{
                flex: 1, background: 'transparent', border: 'none',
                color: TOKENS.text, fontFamily: TOKENS.mono, fontSize: 12,
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Main split */}
        <div style={{
          flex: 1, minHeight: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          padding: '0 48px 28px', gap: 24,
        }}>
          {/* Table */}
          <div style={{
            border: `1px solid ${TOKENS.line}`,
            background: TOKENS.bgElev,
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 90px 90px 80px 70px 80px',
              padding: '12px 20px',
              borderBottom: `1px solid ${TOKENS.line}`,
              background: 'rgba(0, 0, 0, 0.3)',
              fontFamily: TOKENS.mono, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.2em', color: TOKENS.textDim,
            }}>
              <div>RANG</div>
              <div>CHASSEUR</div>
              <div style={{ textAlign: 'right' }}>POINTS</div>
              <div style={{ textAlign: 'right' }}>V / D</div>
              <div style={{ textAlign: 'right' }}>PRÉC.</div>
              <div style={{ textAlign: 'right' }}>🔥</div>
              <div style={{ textAlign: 'right' }}>TREND</div>
            </div>

            {/* Rows */}
            <div style={{ flex: 1, overflow: 'auto' }}>
              {players.map(p => (
                <div key={p.r} style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 90px 90px 80px 70px 80px',
                  padding: '14px 20px',
                  borderBottom: `1px solid ${TOKENS.line}`,
                  fontFamily: TOKENS.mono, fontSize: 13,
                  alignItems: 'center',
                  background: p.r <= 3 ? 'rgba(0, 255, 136, 0.02)' : 'transparent',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: p.r === 1 ? TOKENS.amber : p.r <= 3 ? TOKENS.neon : TOKENS.textMute,
                    fontWeight: 700,
                  }}>
                    {p.r === 1 && '👑'}
                    {p.r === 2 && '✦'}
                    {p.r === 3 && '✦'}
                    {String(p.r).padStart(2, '0')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: TOKENS.text, fontWeight: 600 }}>
                    <span style={{ fontSize: 14 }}>{p.flag}</span>
                    {p.n}
                    {p.badge && <span style={{ fontSize: 14 }}>{p.badge}</span>}
                  </div>
                  <div style={{ textAlign: 'right', color: TOKENS.neon, fontWeight: 700 }}>
                    {p.pts.toLocaleString('fr-FR')}
                  </div>
                  <div style={{ textAlign: 'right', color: TOKENS.textMute }}>
                    <span style={{ color: TOKENS.text }}>{p.w}</span>
                    <span style={{ color: TOKENS.textDim, margin: '0 4px' }}>/</span>
                    <span style={{ color: TOKENS.textDim }}>{p.l}</span>
                  </div>
                  <div style={{ textAlign: 'right', color: p.acc >= 75 ? TOKENS.neon : TOKENS.text }}>
                    {p.acc.toFixed(1)}%
                  </div>
                  <div style={{ textAlign: 'right', color: p.streak >= 20 ? TOKENS.amber : TOKENS.textMute }}>
                    {p.streak}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Sparkline/>
                  </div>
                </div>
              ))}
              <div style={{
                padding: '14px 20px',
                fontFamily: TOKENS.mono, fontSize: 11,
                color: TOKENS.textDim, textAlign: 'center',
                background: 'rgba(0,0,0,0.3)',
              }}>
                ── 234 joueurs de plus dans le top 100 · scroll ──
              </div>
            </div>
          </div>

          {/* Right panel: my rank */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
            <div style={{
              padding: '20px 22px',
              background: `linear-gradient(180deg, rgba(0, 255, 136, 0.08), transparent)`,
              border: `1px solid ${TOKENS.lineStrong}`,
              position: 'relative',
            }}>
              <Brackets size={10} color={TOKENS.neon}/>
              <div style={{
                fontFamily: TOKENS.mono, fontSize: 10, fontWeight: 600,
                letterSpacing: '0.2em', color: TOKENS.neon,
              }}>TON RANG</div>
              <div style={{
                fontFamily: TOKENS.display, fontWeight: 900,
                fontSize: 64, color: TOKENS.text, lineHeight: 1,
                marginTop: 4, letterSpacing: '-0.02em',
                textShadow: `0 0 20px ${TOKENS.neonGlow}`,
              }}>
                #247
              </div>
              <div style={{
                marginTop: 4,
                fontFamily: TOKENS.mono, fontSize: 12,
                color: TOKENS.neonDim,
              }}>
                ▲ +12 cette semaine
              </div>

              <div style={{
                marginTop: 18,
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: 1, background: TOKENS.line,
                border: `1px solid ${TOKENS.line}`,
              }}>
                {[
                  { l: 'Points', v: '1,260' },
                  { l: 'Victoires', v: '94' },
                  { l: 'Précision', v: '67.3%' },
                  { l: 'Streak max', v: '11' },
                ].map((s, i) => (
                  <div key={i} style={{
                    padding: '10px 12px',
                    background: TOKENS.bgElev,
                  }}>
                    <div style={{
                      fontFamily: TOKENS.mono, fontSize: 9,
                      color: TOKENS.textDim, letterSpacing: '0.15em',
                    }}>{s.l}</div>
                    <div style={{
                      fontFamily: TOKENS.display, fontWeight: 700,
                      fontSize: 18, color: TOKENS.text, marginTop: 3,
                    }}>{s.v}</div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 14,
                fontFamily: TOKENS.mono, fontSize: 10,
                color: TOKENS.textMute,
              }}>
                Prochain palier <span style={{ color: TOKENS.text }}>#246</span> dans <span style={{ color: TOKENS.neon }}>+3 pts</span>
              </div>

              <button className="bob-btn-primary" style={{ marginTop: 18, width: '100%', padding: '14px' }}>
                MONTER AU CLASSEMENT
              </button>
            </div>

            {/* Neighbors */}
            <div style={{
              padding: '14px 16px',
              border: `1px solid ${TOKENS.line}`,
              background: TOKENS.bgElev,
            }}>
              <div style={{
                fontFamily: TOKENS.mono, fontSize: 10, fontWeight: 600,
                letterSpacing: '0.2em', color: TOKENS.textMute,
                marginBottom: 8,
              }}>AUTOUR DE TOI</div>

              {[
                { r: 245, n: 'lou.2002', pts: '1,262' },
                { r: 246, n: 'theo.l', pts: '1,258' },
                { r: 247, n: 'Matteo7', pts: '1,260', me: true },
                { r: 248, n: 'alxmrtnz', pts: '1,255' },
                { r: 249, n: 'papyyy.94', pts: '1,250' },
              ].map(row => (
                <div key={row.r} style={{
                  display: 'grid',
                  gridTemplateColumns: '44px 1fr auto',
                  alignItems: 'center',
                  padding: '6px 6px',
                  background: row.me ? 'rgba(0, 255, 136, 0.08)' : 'transparent',
                  fontFamily: TOKENS.mono, fontSize: 12,
                  borderLeft: row.me ? `2px solid ${TOKENS.neon}` : '2px solid transparent',
                }}>
                  <span style={{ color: row.me ? TOKENS.neon : TOKENS.textDim }}>#{row.r}</span>
                  <span style={{ color: row.me ? TOKENS.text : TOKENS.textMute, fontWeight: row.me ? 700 : 400 }}>
                    {row.n}
                  </span>
                  <span style={{ color: row.me ? TOKENS.neon : TOKENS.textMute }}>{row.pts}</span>
                </div>
              ))}
            </div>

            <div style={{
              padding: '14px 16px',
              border: `1px solid ${TOKENS.line}`,
              background: 'rgba(255, 45, 149, 0.04)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ fontSize: 26 }}>🏆</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: TOKENS.display, fontWeight: 700,
                  fontSize: 13, color: TOKENS.text,
                  letterSpacing: '0.05em',
                }}>Récompense Top 100</div>
                <div style={{
                  fontFamily: TOKENS.mono, fontSize: 10,
                  color: TOKENS.textMute, marginTop: 2,
                }}>
                  Badge permanent + skin chat exclusif
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkline() {
  // simple static SVG sparkline
  const pts = [5, 8, 6, 9, 7, 12, 10, 14, 12, 16];
  const w = 60, h = 20;
  const max = Math.max(...pts);
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (pts.length - 1)) * w} ${h - (p / max) * h}`).join(' ');
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <path d={d} fill="none" stroke={TOKENS.neon} strokeWidth="1.5" opacity="0.8"/>
      <circle cx={w} cy={h - (pts[pts.length - 1] / max) * h} r="2" fill={TOKENS.neon}/>
    </svg>
  );
}

Object.assign(window, { Leaderboard });
