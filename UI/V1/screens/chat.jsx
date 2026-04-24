// Screen 2: Chat duel — the core product screen.
// 3min timer counting down, anonymous bubbles, typing animation,
// report button floating, Humain/Bot CTA at the end.

function ChatDuel({ bubbleStyle = 'terminal' }) {
  // bubbleStyle: 'terminal' | 'neon' | 'minimal'
  const messages = [
    { side: 'them', text: "yo, ça va ?", t: '02:47' },
    { side: 'me',   text: "ouais tranquille, toi ?", t: '02:42' },
    { side: 'them', text: "ça roule. tu fais quoi là, t'es en pause taff ou ?", t: '02:36' },
    { side: 'me',   text: "ouais j'essaie de déco 5min mdr. et toi t'es d'où ?", t: '02:28' },
    { side: 'them', text: "02", t: '02:19' },
    { side: 'me',   text: "ah stylé. tu bosses sur quoi du coup", t: '02:10' },
    { side: 'them', text: "principalement du NLP en ce moment, c'est un domaine qui évolue très rapidement et que je trouve fascinant", t: '02:01' },
    { side: 'me',   text: "... ok suspect cette phrase 👀", t: '01:52' },
    { side: 'them', text: "haha pk suspect ? 😅", t: '01:46' },
  ];

  const bubbleFor = (m, i) => {
    const mine = m.side === 'me';
    const base = {
      maxWidth: '72%',
      padding: '10px 14px',
      fontFamily: TOKENS.body,
      fontSize: 14,
      lineHeight: 1.45,
      whiteSpace: 'pre-wrap',
      position: 'relative',
    };
    if (bubbleStyle === 'terminal') {
      return {
        ...base,
        background: mine ? 'rgba(0, 255, 136, 0.08)' : '#0f1411',
        border: `1px solid ${mine ? TOKENS.lineStrong : TOKENS.line}`,
        color: mine ? TOKENS.neon : TOKENS.text,
        fontFamily: TOKENS.mono,
        fontSize: 13,
        borderRadius: 0,
      };
    }
    if (bubbleStyle === 'neon') {
      return {
        ...base,
        background: mine ? TOKENS.neon : 'rgba(255, 45, 149, 0.08)',
        border: mine ? 'none' : `1px solid rgba(255, 45, 149, 0.4)`,
        color: mine ? '#000' : '#ffb3d9',
        borderRadius: 18,
        boxShadow: mine ? `0 0 20px ${TOKENS.neonGlow}` : '0 0 20px rgba(255, 45, 149, 0.25)',
        fontWeight: 500,
      };
    }
    // minimal
    return {
      ...base,
      background: mine ? '#151a16' : '#0a0d0b',
      border: `1px solid ${TOKENS.line}`,
      color: mine ? TOKENS.text : TOKENS.textMute,
      borderRadius: 14,
    };
  };

  return (
    <div className="bob-screen bob-scanlines">
      <TopNav active="DUEL" />

      {/* Duel header bar */}
      <div style={{
        height: 72, flexShrink: 0,
        borderBottom: `1px solid ${TOKENS.line}`,
        background: 'rgba(10, 15, 12, 0.6)',
        display: 'flex', alignItems: 'center',
        padding: '0 28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
          <div style={{
            width: 48, height: 48,
            border: `1px solid ${TOKENS.lineStrong}`,
            background: '#0f1411',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: TOKENS.display, fontWeight: 900,
            color: TOKENS.neon, fontSize: 20,
            position: 'relative',
          }}>
            <Brackets size={6} color={TOKENS.neon}/>
            ?
          </div>
          <div>
            <div style={{
              fontFamily: TOKENS.mono, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.15em', color: TOKENS.textMute,
            }}>
              ADVERSAIRE ANONYME · ID#7F3A
            </div>
            <div style={{
              fontFamily: TOKENS.display, fontWeight: 700,
              fontSize: 18, color: TOKENS.text,
              marginTop: 2, letterSpacing: '0.02em',
            }}>
              Humain ou IA ?
            </div>
          </div>
        </div>

        {/* Timer */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '8px 18px',
          border: `1px solid ${TOKENS.lineStrong}`,
          background: 'rgba(0, 255, 136, 0.04)',
        }}>
          <div style={{
            fontFamily: TOKENS.mono, fontSize: 9, fontWeight: 600,
            letterSpacing: '0.2em', color: TOKENS.textMute,
          }}>TEMPS RESTANT</div>
          <div style={{
            fontFamily: TOKENS.display, fontWeight: 800,
            fontSize: 28, color: TOKENS.neon,
            textShadow: `0 0 10px ${TOKENS.neonGlow}`,
            letterSpacing: '0.05em',
          }}>
            01:46
          </div>
          <div style={{
            width: 2, height: 24,
            background: TOKENS.neon,
          }} className="bob-blink"/>
        </div>

        <div style={{ width: 18 }}/>

        {/* Signaler bot button */}
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 14px',
          background: 'rgba(255, 69, 69, 0.06)',
          border: `1px solid rgba(255, 69, 69, 0.35)`,
          color: TOKENS.red,
          fontFamily: TOKENS.mono, fontSize: 11, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
          <span style={{ fontSize: 14 }}>⚠</span>
          Signaler bot
        </button>
      </div>

      {/* Main chat area */}
      <div style={{
        position: 'absolute',
        top: 56 + 72, bottom: 0, left: 0, right: 0,
        display: 'flex',
      }}>
        {/* Left rail — duel stats */}
        <div style={{
          width: 220, flexShrink: 0,
          borderRight: `1px solid ${TOKENS.line}`,
          padding: '24px 20px',
          background: 'rgba(6, 8, 6, 0.5)',
        }}>
          <div style={{
            fontFamily: TOKENS.mono, fontSize: 9, fontWeight: 600,
            letterSpacing: '0.2em', color: TOKENS.textDim,
            marginBottom: 14,
          }}>// DUEL #4,281</div>

          <StatLine label="Round" value="1/1"/>
          <StatLine label="Mise" value="+10 / −5"/>
          <StatLine label="Messages" value="9"/>
          <StatLine label="Latence adv." value="~1.4s"/>

          <div style={{
            margin: '24px 0 12px',
            height: 1, background: TOKENS.line,
          }}/>

          <div style={{
            fontFamily: TOKENS.mono, fontSize: 9, fontWeight: 600,
            letterSpacing: '0.2em', color: TOKENS.textDim,
            marginBottom: 12,
          }}>// INDICES</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { ok: true, label: 'Fautes de frappe' },
              { ok: true, label: 'Argot / abrév.' },
              { ok: false, label: 'Ton scolaire' },
              { ok: null, label: 'Réponse trop longue' },
            ].map((h, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontFamily: TOKENS.mono, fontSize: 11,
                color: h.ok === true ? TOKENS.neon : h.ok === false ? TOKENS.red : TOKENS.textMute,
              }}>
                <span style={{
                  width: 14, textAlign: 'center',
                  color: h.ok === true ? TOKENS.neon : h.ok === false ? TOKENS.red : TOKENS.textDim,
                }}>
                  {h.ok === true ? '✓' : h.ok === false ? '✗' : '·'}
                </span>
                <span style={{ opacity: h.ok === null ? 0.5 : 1 }}>{h.label}</span>
              </div>
            ))}
          </div>

          <div style={{
            margin: '24px 0 12px',
            height: 1, background: TOKENS.line,
          }}/>

          <div style={{
            fontFamily: TOKENS.mono, fontSize: 10,
            color: TOKENS.textMute, lineHeight: 1.6,
          }}>
            <span style={{ color: TOKENS.amber }}>⚠</span> Chaque message envoyé est <span style={{ color: TOKENS.text }}>anonyme</span>. Aucune donnée sauvegardée après le duel.
          </div>
        </div>

        {/* Chat column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Messages */}
          <div style={{
            flex: 1, overflow: 'hidden',
            padding: '28px 36px 20px',
            display: 'flex', flexDirection: 'column', gap: 10,
            position: 'relative',
          }}>
            {/* Connection banner */}
            <div style={{
              alignSelf: 'center',
              fontFamily: TOKENS.mono, fontSize: 10,
              color: TOKENS.textDim,
              letterSpacing: '0.15em',
              marginBottom: 8,
            }}>
              ── CONNECTÉ À ID#7F3A · 19:42:03 ──
            </div>

            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: m.side === 'me' ? 'flex-end' : 'flex-start',
                gap: 8,
                alignItems: 'flex-end',
              }}>
                {m.side === 'them' && (
                  <div style={{
                    width: 22, height: 22, flexShrink: 0,
                    border: `1px solid ${TOKENS.line}`,
                    fontFamily: TOKENS.mono, fontSize: 9,
                    color: TOKENS.textMute,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 4,
                  }}>?</div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: m.side === 'me' ? 'flex-end' : 'flex-start', gap: 2 }}>
                  <div style={bubbleFor(m, i)}>
                    {m.text}
                  </div>
                  <div style={{
                    fontFamily: TOKENS.mono, fontSize: 9,
                    color: TOKENS.textDim,
                    padding: '0 4px',
                  }}>
                    {m.side === 'me' ? 'TOI' : 'ADV'} · {m.t}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 8, alignItems: 'flex-end', marginTop: 4 }}>
              <div style={{
                width: 22, height: 22, flexShrink: 0,
                border: `1px solid ${TOKENS.line}`,
                fontFamily: TOKENS.mono, fontSize: 9,
                color: TOKENS.textMute,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>?</div>
              <div style={{
                padding: '12px 18px',
                background: '#0f1411',
                border: `1px solid ${TOKENS.line}`,
                display: 'flex', gap: 4,
              }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: TOKENS.neon,
                    animation: `bob-typing 1.2s infinite`,
                    animationDelay: `${i * 0.15}s`,
                  }}/>
                ))}
              </div>
              <div style={{
                fontFamily: TOKENS.mono, fontSize: 9,
                color: TOKENS.textDim,
              }}>écrit...</div>
            </div>
          </div>

          {/* Input bar + decision CTAs */}
          <div style={{
            flexShrink: 0,
            borderTop: `1px solid ${TOKENS.line}`,
            background: 'rgba(6, 8, 6, 0.7)',
            padding: '16px 36px',
          }}>
            {/* Input */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '4px 4px 4px 18px',
              background: '#0f1411',
              border: `1px solid ${TOKENS.lineStrong}`,
            }}>
              <div style={{
                fontFamily: TOKENS.mono, fontSize: 14,
                color: TOKENS.neon,
              }}>&gt;</div>
              <input
                placeholder="Tape ta réponse..."
                style={{
                  flex: 1, background: 'transparent', border: 'none',
                  color: TOKENS.text, fontFamily: TOKENS.body, fontSize: 14,
                  padding: '12px 0',
                  outline: 'none',
                }}
                defaultValue="c'est chelou comment tu parles là"
              />
              <div style={{
                fontFamily: TOKENS.mono, fontSize: 10,
                color: TOKENS.textDim,
              }}>32/280</div>
              <button style={{
                padding: '10px 18px',
                background: TOKENS.neon, color: '#000',
                border: 'none',
                fontFamily: TOKENS.mono, fontSize: 12, fontWeight: 700,
                letterSpacing: '0.12em',
                cursor: 'pointer',
              }}>
                ENVOYER ↵
              </button>
            </div>

            {/* Decision row */}
            <div style={{
              marginTop: 16,
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                flex: 1,
                fontFamily: TOKENS.mono, fontSize: 11,
                color: TOKENS.textMute,
                letterSpacing: '0.05em',
              }}>
                <span style={{ color: TOKENS.neon }}>▸</span> Tu peux trancher à tout moment. <span style={{ color: TOKENS.text }}>Gagne gros, perds peu.</span>
              </div>

              <button style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 22px',
                background: 'rgba(0, 255, 136, 0.08)',
                border: `1px solid ${TOKENS.neon}`,
                color: TOKENS.neon,
                fontFamily: TOKENS.display, fontWeight: 800,
                fontSize: 13, letterSpacing: '0.12em',
                cursor: 'pointer',
              }}>
                <span style={{ fontSize: 16 }}>👤</span>
                C'EST UN HUMAIN
              </button>

              <button style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 22px',
                background: 'rgba(255, 45, 149, 0.08)',
                border: `1px solid ${TOKENS.magenta}`,
                color: TOKENS.magenta,
                fontFamily: TOKENS.display, fontWeight: 800,
                fontSize: 13, letterSpacing: '0.12em',
                cursor: 'pointer',
              }}>
                <span style={{ fontSize: 16 }}>🤖</span>
                C'EST UN BOT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatLine({ label, value }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '7px 0',
      borderBottom: `1px dashed ${TOKENS.line}`,
      fontFamily: TOKENS.mono, fontSize: 11,
    }}>
      <span style={{ color: TOKENS.textMute }}>{label}</span>
      <span style={{ color: TOKENS.text, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

Object.assign(window, { ChatDuel });
