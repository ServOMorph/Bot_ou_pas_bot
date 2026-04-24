// Screen 3: Result — verdict reveal, streak badge, share TikTok preview

function Result() {
  return (
    <div className="bob-screen bob-scanlines">
      <TopNav active="DUEL" streak={8} points={1250}/>

      <div style={{
        position: 'absolute',
        top: 56, bottom: 0, left: 0, right: 0,
        display: 'flex',
        overflow: 'hidden',
      }}>
        {/* Left: verdict */}
        <div style={{
          flex: 1,
          padding: '48px 56px',
          display: 'flex', flexDirection: 'column',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: 20, left: 0, right: 0,
            textAlign: 'center',
            fontFamily: TOKENS.mono, fontSize: 10,
            color: TOKENS.textDim, letterSpacing: '0.3em',
          }}>
            ── VERDICT · DUEL #4,281 ──
          </div>

          {/* Win banner */}
          <div style={{ marginTop: 36 }}>
            <div style={{
              fontFamily: TOKENS.mono, fontSize: 12,
              color: TOKENS.neon, letterSpacing: '0.2em',
              fontWeight: 600, marginBottom: 8,
            }}>
              ◆ BONNE RÉPONSE
            </div>
            <div style={{
              fontFamily: TOKENS.display, fontWeight: 900,
              fontSize: 82, lineHeight: 0.95,
              color: TOKENS.text, letterSpacing: '-0.02em',
            }}>
              C'ÉTAIT UN<br/>
              <span className="bob-glitch" data-text="BOT.">BOT.</span>
            </div>
            <div style={{
              marginTop: 14,
              fontFamily: TOKENS.body, fontSize: 16,
              color: TOKENS.textMute, maxWidth: 520,
              lineHeight: 1.5,
            }}>
              Tu as démasqué <span style={{ color: TOKENS.text, fontFamily: TOKENS.mono }}>gpt-4.7-turbo</span> en <span style={{ color: TOKENS.neon }}>1 min 14 s</span>. L'IA a trompé 68% des joueurs cette semaine.
            </div>
          </div>

          {/* Score grid */}
          <div style={{
            marginTop: 36,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: TOKENS.line,
            border: `1px solid ${TOKENS.line}`,
          }}>
            <ScoreCell label="Points gagnés" value="+10" sub="base +10" accent={TOKENS.neon}/>
            <ScoreCell label="Bonus rapidité" value="+4" sub="&lt; 1:30" accent={TOKENS.neon}/>
            <ScoreCell label="Streak bonus" value="+6" sub="×1.6" accent={TOKENS.amber}/>
            <ScoreCell label="Total duel" value="+20" sub="→ 1,260 pts" accent={TOKENS.text} big/>
          </div>

          {/* Streak animated badge */}
          <div style={{
            marginTop: 24,
            padding: '18px 22px',
            border: `1px solid rgba(255, 176, 32, 0.4)`,
            background: 'linear-gradient(135deg, rgba(255, 176, 32, 0.05), transparent 70%)',
            display: 'flex', alignItems: 'center', gap: 22,
          }}>
            <div style={{
              width: 68, height: 68, flexShrink: 0,
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40,
              animation: 'bob-pulse 2s infinite',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle, rgba(255, 176, 32, 0.4), transparent 70%)`,
                filter: 'blur(12px)',
              }}/>
              <span style={{ position: 'relative' }}>🔥</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: TOKENS.mono, fontSize: 10,
                color: TOKENS.amber, letterSpacing: '0.2em', fontWeight: 600,
              }}>STREAK EN COURS</div>
              <div style={{
                fontFamily: TOKENS.display, fontWeight: 900,
                fontSize: 32, color: TOKENS.text, marginTop: 2,
              }}>
                8 <span style={{ color: TOKENS.textMute, fontSize: 18, fontWeight: 500 }}>victoires d'affilée</span>
              </div>
              <div style={{
                marginTop: 6,
                fontFamily: TOKENS.mono, fontSize: 11,
                color: TOKENS.textMute,
              }}>
                Encore <span style={{ color: TOKENS.amber }}>2</span> pour débloquer le badge « Chasseur de Turing »
              </div>
            </div>
            {/* Streak pip progress */}
            <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
              {[...Array(10)].map((_, i) => (
                <div key={i} style={{
                  width: 12, height: 22,
                  background: i < 8 ? TOKENS.amber : 'transparent',
                  border: `1px solid ${i < 8 ? TOKENS.amber : TOKENS.line}`,
                  boxShadow: i < 8 ? '0 0 6px rgba(255, 176, 32, 0.5)' : 'none',
                }}/>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{
            marginTop: 28,
            display: 'flex', gap: 14,
          }}>
            <button className="bob-btn-primary" style={{ flex: 1, padding: '18px' }}>
              <span style={{ fontSize: 18 }}>↻</span>
              REJOUER
            </button>
            <button style={{
              flex: 1,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '18px',
              background: 'transparent',
              border: `1px solid ${TOKENS.magenta}`,
              color: TOKENS.magenta,
              fontFamily: TOKENS.display, fontWeight: 800,
              fontSize: 14, letterSpacing: '0.12em',
              cursor: 'pointer',
            }}>
              <TikTokIcon/>
              PARTAGER TIKTOK
            </button>
            <button className="bob-btn-ghost" style={{ padding: '18px 22px' }}>
              REVOIR CHAT
            </button>
          </div>

          <div style={{
            marginTop: 20,
            fontFamily: TOKENS.mono, fontSize: 11,
            color: TOKENS.textDim,
            letterSpacing: '0.08em',
          }}>
            <span style={{ color: TOKENS.neon }}>▸</span> Prochain matchmaking dans <span style={{ color: TOKENS.text }}>3s</span>... Appuie sur <span style={{ color: TOKENS.text, padding: '2px 6px', border: `1px solid ${TOKENS.line}` }}>ESPACE</span> pour enchaîner.
          </div>
        </div>

        {/* Right: TikTok preview + rank teaser */}
        <div style={{
          width: 420, flexShrink: 0,
          borderLeft: `1px solid ${TOKENS.line}`,
          background: 'rgba(6, 8, 6, 0.5)',
          padding: '48px 32px 32px',
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          <div>
            <div style={{
              fontFamily: TOKENS.mono, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.2em', color: TOKENS.textMute,
              marginBottom: 10,
            }}>
              // APERÇU PARTAGE · 9:16
            </div>

            {/* Fake TikTok preview card */}
            <div style={{
              width: 240, height: 427, margin: '0 auto',
              background: `linear-gradient(180deg, ${TOKENS.bg} 0%, #0a1208 40%, #0a0a0a 100%)`,
              border: `1px solid ${TOKENS.lineStrong}`,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Watermark */}
              <div style={{
                position: 'absolute', top: 12, left: 12,
                fontFamily: TOKENS.display, fontWeight: 900,
                fontSize: 10, letterSpacing: '0.1em',
                color: TOKENS.neon,
              }}>BOT/PAS BOT</div>

              <div style={{
                position: 'absolute', top: 12, right: 12,
                fontFamily: TOKENS.mono, fontSize: 9,
                color: TOKENS.textMute,
              }}>#botoupasbot</div>

              {/* Center score */}
              <div style={{
                position: 'absolute',
                top: '28%', left: 0, right: 0,
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: TOKENS.mono, fontSize: 10,
                  color: TOKENS.neon, letterSpacing: '0.2em',
                  marginBottom: 8,
                }}>J'AI GAGNÉ</div>
                <div style={{
                  fontFamily: TOKENS.display, fontWeight: 900,
                  fontSize: 64, color: TOKENS.text,
                  lineHeight: 0.9,
                }}>+20</div>
                <div style={{
                  fontFamily: TOKENS.mono, fontSize: 10,
                  color: TOKENS.neon, marginTop: 6,
                  letterSpacing: '0.15em',
                }}>POINTS</div>

                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 36, marginBottom: 4 }}>🔥 × 8</div>
                  <div style={{
                    fontFamily: TOKENS.display, fontWeight: 700,
                    fontSize: 14, color: TOKENS.text,
                    letterSpacing: '0.08em',
                  }}>STREAK EN FEU</div>
                </div>
              </div>

              {/* Bottom caption */}
              <div style={{
                position: 'absolute',
                bottom: 60, left: 12, right: 12,
                fontFamily: TOKENS.body, fontSize: 11,
                color: TOKENS.text, lineHeight: 1.4,
              }}>
                <div style={{ fontWeight: 600 }}>@Matteo7</div>
                <div style={{ color: '#bbb', marginTop: 2 }}>
                  j'ai grillé un bot en 1min14 😤 <span style={{ color: TOKENS.neon }}>#botoupasbot</span> #ia #france
                </div>
              </div>

              {/* Bottom player bar */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 36,
                borderTop: `1px solid ${TOKENS.line}`,
                background: 'rgba(0,0,0,0.7)',
                display: 'flex', alignItems: 'center',
                padding: '0 12px', gap: 10,
                fontFamily: TOKENS.mono, fontSize: 9,
                color: TOKENS.textMute,
              }}>
                <span>▶</span>
                <div style={{ flex: 1, height: 2, background: '#333' }}>
                  <div style={{ width: '40%', height: '100%', background: TOKENS.neon }}/>
                </div>
                <span>0:06 / 0:15</span>
              </div>
            </div>

            {/* Action chips */}
            <div style={{
              marginTop: 12,
              display: 'flex', gap: 6, justifyContent: 'center',
            }}>
              {['TikTok', 'Insta Story', 'Lien'].map((l, i) => (
                <div key={l} style={{
                  padding: '6px 12px',
                  border: `1px solid ${i === 0 ? TOKENS.magenta : TOKENS.line}`,
                  background: i === 0 ? 'rgba(255, 45, 149, 0.08)' : 'transparent',
                  color: i === 0 ? TOKENS.magenta : TOKENS.textMute,
                  fontFamily: TOKENS.mono, fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer',
                }}>{l}</div>
              ))}
            </div>
          </div>

          {/* Rank teaser */}
          <div style={{
            padding: '16px 18px',
            border: `1px solid ${TOKENS.line}`,
            background: TOKENS.bgElev,
          }}>
            <div style={{
              fontFamily: TOKENS.mono, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.2em', color: TOKENS.textMute,
            }}>APERÇU CLASSEMENT</div>

            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { r: '#245', n: 'lou.2002', pts: '1,262' },
                { r: '#246', n: 'theo.l', pts: '1,258' },
                { r: '#247', n: 'Matteo7 (toi)', pts: '1,260', me: true },
                { r: '#248', n: 'alxmrtnz', pts: '1,255' },
                { r: '#249', n: 'papyyy.94', pts: '1,250' },
              ].map(row => (
                <div key={row.r} style={{
                  display: 'flex', alignItems: 'center',
                  padding: '6px 8px',
                  background: row.me ? 'rgba(0, 255, 136, 0.08)' : 'transparent',
                  border: row.me ? `1px solid ${TOKENS.lineStrong}` : '1px solid transparent',
                  fontFamily: TOKENS.mono, fontSize: 12,
                }}>
                  <span style={{ width: 44, color: row.me ? TOKENS.neon : TOKENS.textDim }}>{row.r}</span>
                  <span style={{ flex: 1, color: row.me ? TOKENS.neon : TOKENS.text, fontWeight: row.me ? 700 : 400 }}>
                    {row.n}
                  </span>
                  <span style={{ color: row.me ? TOKENS.neon : TOKENS.textMute }}>{row.pts}</span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 12,
              fontFamily: TOKENS.mono, fontSize: 11,
              color: TOKENS.neonDim,
            }}>
              <span style={{ color: TOKENS.neon }}>▲ +2 places</span> cette semaine
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreCell({ label, value, sub, accent, big }) {
  return (
    <div style={{
      padding: '16px 18px',
      background: TOKENS.bgElev,
    }}>
      <div style={{
        fontFamily: TOKENS.mono, fontSize: 10,
        color: TOKENS.textMute, letterSpacing: '0.15em',
        fontWeight: 600,
      }}>{label}</div>
      <div style={{
        fontFamily: TOKENS.display, fontWeight: 900,
        fontSize: big ? 34 : 30,
        color: accent,
        marginTop: 6,
        letterSpacing: '-0.01em',
        textShadow: accent === TOKENS.neon ? `0 0 12px ${TOKENS.neonGlow}` : 'none',
      }}>{value}</div>
      <div style={{
        fontFamily: TOKENS.mono, fontSize: 10,
        color: TOKENS.textDim, marginTop: 4,
      }}>{sub}</div>
    </div>
  );
}

function TikTokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z"/>
    </svg>
  );
}

Object.assign(window, { Result });
