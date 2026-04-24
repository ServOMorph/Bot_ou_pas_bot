// Screen 1: Homepage — hero + CTA + classement teaser + stats live

function Homepage() {
  return (
    <div className="bob-screen bob-scanlines">
      <TopNav active="DUEL" />

      <div className="bob-grid-bg" style={{
        position: 'absolute',
        top: 56, bottom: 0, left: 0, right: 0,
        overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute',
          top: '18%', left: '25%',
          width: 600, height: 600,
          background: `radial-gradient(circle, ${TOKENS.neonGlow} 0%, transparent 60%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}/>

        {/* Live counter marquee */}
        <div style={{
          position: 'absolute',
          top: 16, left: 0, right: 0,
          height: 28,
          borderTop: `1px solid ${TOKENS.line}`,
          borderBottom: `1px solid ${TOKENS.line}`,
          background: 'rgba(6, 8, 6, 0.5)',
          overflow: 'hidden',
          display: 'flex', alignItems: 'center',
        }}>
          <div style={{
            display: 'flex', gap: 40,
            fontFamily: TOKENS.mono, fontSize: 11,
            color: TOKENS.textMute,
            whiteSpace: 'nowrap',
            animation: 'bob-marquee 45s linear infinite',
          }}>
            {[...Array(2)].map((_, k) => (
              <React.Fragment key={k}>
                <span><span style={{ color: TOKENS.neon }}>◆</span> 4,281 DUELS EN COURS</span>
                <span><span style={{ color: TOKENS.amber }}>🔥</span> STREAK RECORD · @NinaLyon · 47</span>
                <span><span style={{ color: TOKENS.magenta }}>●</span> +128,543 DUELS JOUÉS AUJOURD'HUI</span>
                <span><span style={{ color: TOKENS.cyan }}>▸</span> PRÉCISION MOYENNE · 52.3%</span>
                <span><span style={{ color: TOKENS.neon }}>◆</span> 1,249,002 JOUEURS</span>
                <span><span style={{ color: TOKENS.amber }}>⚡</span> TOP IA · GPT-4.7 (81% TAUX DE TROMPERIE)</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div style={{
          position: 'absolute',
          top: 72, left: 60, right: 60,
          display: 'flex', gap: 48,
        }}>
          <div style={{ flex: '1.3' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '6px 12px',
              border: `1px solid ${TOKENS.line}`,
              background: 'rgba(0, 255, 136, 0.04)',
              marginBottom: 32,
            }}>
              <span className="bob-dot-live"/>
              <span style={{
                fontFamily: TOKENS.mono, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.15em', color: TOKENS.neon,
              }}>
                SAISON 03 · EN LIGNE
              </span>
            </div>

            <h1 style={{
              margin: 0,
              fontFamily: TOKENS.display,
              fontWeight: 900,
              fontSize: 96,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: TOKENS.text,
            }}>
              DÉFIE L'IA<br/>
              <span className="bob-glitch" data-text="EN DUEL.">EN DUEL.</span>
            </h1>

            <p style={{
              marginTop: 28, maxWidth: 560,
              fontFamily: TOKENS.body, fontSize: 18,
              lineHeight: 1.55, color: TOKENS.textMute,
            }}>
              3 minutes. Un chat anonyme. Une question :<br/>
              <span style={{ color: TOKENS.text, fontWeight: 600 }}>tu parles à un humain, ou à un bot ?</span>
              {' '}Tranche avant la fin du timer, grimpe au classement, flex sur TikTok.
            </p>

            <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
              <button className="bob-btn-primary" style={{ padding: '22px 40px', fontSize: 17 }}>
                <span style={{ fontSize: 20 }}>▶</span>
                LANCER UN DUEL
              </button>
              <button className="bob-btn-ghost" style={{ padding: '18px 22px' }}>
                COMMENT ÇA MARCHE
              </button>
              <div style={{
                marginLeft: 8,
                fontFamily: TOKENS.mono, fontSize: 11,
                color: TOKENS.textDim,
              }}>
                <div>MATCHMAKING &lt; 2s</div>
                <div>GRATUIT · SANS COMPTE</div>
              </div>
            </div>

            {/* How it works mini */}
            <div style={{
              marginTop: 56,
              display: 'flex', gap: 12,
              maxWidth: 640,
            }}>
              {[
                { n: '01', t: 'MATCH', d: 'Appariement aléatoire avec un humain ou une IA de pointe.' },
                { n: '02', t: 'CHAT', d: '3 minutes pour détecter les tics, les fautes, les réponses trop propres.' },
                { n: '03', t: 'VERDICT', d: 'Tranche. +10 si juste, −5 si mauvais. Enchaîne pour la streak.' },
              ].map(s => (
                <div key={s.n} style={{
                  flex: 1,
                  padding: '14px 16px',
                  background: 'rgba(11, 15, 12, 0.6)',
                  border: `1px solid ${TOKENS.line}`,
                  position: 'relative',
                }}>
                  <div style={{
                    fontFamily: TOKENS.mono, fontSize: 10,
                    color: TOKENS.neon, fontWeight: 700,
                    letterSpacing: '0.2em',
                  }}>{s.n}</div>
                  <div style={{
                    fontFamily: TOKENS.display, fontWeight: 800,
                    fontSize: 15, color: TOKENS.text,
                    marginTop: 4, letterSpacing: '0.05em',
                  }}>{s.t}</div>
                  <div style={{
                    fontFamily: TOKENS.body, fontSize: 12,
                    color: TOKENS.textMute, marginTop: 6,
                    lineHeight: 1.45,
                  }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: leaderboard teaser */}
          <div style={{ width: 360, flexShrink: 0 }}>
            <div style={{
              background: 'rgba(11, 15, 12, 0.85)',
              border: `1px solid ${TOKENS.lineStrong}`,
              padding: '20px 22px',
              position: 'relative',
            }}>
              <Brackets size={10} color={TOKENS.neon}/>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{
                  fontFamily: TOKENS.display, fontWeight: 800,
                  fontSize: 14, letterSpacing: '0.12em',
                  color: TOKENS.text,
                }}>
                  TOP CHASSEURS · S03
                </div>
                <div style={{
                  fontFamily: TOKENS.mono, fontSize: 10,
                  color: TOKENS.textMute,
                }}>CETTE SEM.</div>
              </div>

              <div style={{
                marginTop: 14,
                display: 'flex', flexDirection: 'column', gap: 1,
                background: TOKENS.line,
              }}>
                {[
                  { r: 1, n: 'NinaLyon', pts: '18,240', d: '+620', badge: '👑' },
                  { r: 2, n: 'kev_94', pts: '17,105', d: '+410' },
                  { r: 3, n: 'captaincroissant', pts: '16,890', d: '+385' },
                  { r: 4, n: 'zoé.mtl', pts: '15,420', d: '+120' },
                  { r: 5, n: 'xX_frichti_Xx', pts: '14,998', d: '−45' },
                ].map(row => (
                  <div key={row.r} style={{
                    display: 'grid',
                    gridTemplateColumns: '30px 1fr auto auto',
                    gap: 12, alignItems: 'center',
                    padding: '10px 2px',
                    background: TOKENS.bgElev,
                    fontFamily: TOKENS.mono, fontSize: 13,
                  }}>
                    <div style={{
                      color: row.r === 1 ? TOKENS.amber : TOKENS.textMute,
                      fontWeight: 700, textAlign: 'center',
                    }}>
                      {String(row.r).padStart(2, '0')}
                    </div>
                    <div style={{ color: TOKENS.text, display: 'flex', gap: 6, alignItems: 'center' }}>
                      {row.badge && <span>{row.badge}</span>}
                      {row.n}
                    </div>
                    <div style={{ color: TOKENS.neon, fontWeight: 700 }}>{row.pts}</div>
                    <div style={{
                      color: row.d.startsWith('−') ? TOKENS.red : TOKENS.neonDim,
                      fontSize: 11, width: 42, textAlign: 'right',
                    }}>{row.d}</div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 14,
                padding: '10px 12px',
                border: `1px dashed ${TOKENS.line}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontFamily: TOKENS.mono, fontSize: 12,
              }}>
                <div>
                  <div style={{ fontSize: 9, color: TOKENS.textDim, letterSpacing: '0.15em' }}>TON RANG</div>
                  <div style={{ color: TOKENS.text, marginTop: 2 }}>
                    {"01\n👑\nNinaLyon\n18,240\n+620\n02\nkev_94\n17,105\n+410\n03\ncaptaincroissant\n16,890\n+385\n04\nzoé.mtl\n15,420\n+120\n05\nxX_frichti_Xx\n14,998\n−45"}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 9, color: TOKENS.textDim, letterSpacing: '0.15em' }}>POINTS</div>
                  <div style={{ color: TOKENS.neon, fontWeight: 700, marginTop: 2 }}>1,240</div>
                </div>
              </div>

              <button style={{
                marginTop: 14, width: '100%',
                padding: '10px',
                background: 'transparent',
                border: `1px solid ${TOKENS.line}`,
                color: TOKENS.neon,
                fontFamily: TOKENS.mono, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.15em', cursor: 'pointer',
              }}>
                VOIR LE TOP 100 →
              </button>
            </div>

            {/* Mini duel card */}
            <div style={{
              marginTop: 16,
              background: 'linear-gradient(180deg, rgba(255, 45, 149, 0.04), transparent)',
              border: `1px solid rgba(255, 45, 149, 0.25)`,
              padding: '16px 18px',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 8,
              }}>
                <div style={{
                  fontFamily: TOKENS.mono, fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.2em', color: TOKENS.magenta,
                }}>
                  
                </div>
                <div style={{
                  fontFamily: TOKENS.mono, fontSize: 10,
                  color: TOKENS.textMute,
                }}>J−2</div>
              </div>
              <div style={{
                fontFamily: TOKENS.display, fontWeight: 800,
                fontSize: 17, color: TOKENS.text,
                letterSpacing: '0.02em',
              }}>
                Tournoi « Turing Night »
              </div>
              <div style={{
                fontFamily: TOKENS.body, fontSize: 12,
                color: TOKENS.textMute, marginTop: 6,
              }}>
                128 joueurs · 3 manches · Prix à 10 000 pts
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Homepage });
