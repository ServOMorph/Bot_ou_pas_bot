// App root — design canvas with 4 artboards + tweaks for chat bubble style

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bubbleStyle": "terminal"
}/*EDITMODE-END*/;

function Tweaks({ open, values, onChange }) {
  const styles = [
    { id: 'terminal', label: 'Terminal', desc: 'Mono, squared, terminal-feel' },
    { id: 'neon', label: 'Neon Pop', desc: 'Rounded, glowing, magenta accent' },
    { id: 'minimal', label: 'Minimal', desc: 'Soft rounded, low contrast' },
  ];

  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 200,
      width: 280,
      background: '#0a0a0a',
      border: `1px solid ${TOKENS.lineStrong}`,
      boxShadow: `0 8px 40px rgba(0, 255, 136, 0.2), 0 0 0 1px ${TOKENS.line}`,
      fontFamily: TOKENS.body,
    }}>
      <div style={{
        padding: '10px 14px',
        borderBottom: `1px solid ${TOKENS.line}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 7, height: 7, borderRadius: '50%',
          background: TOKENS.neon, boxShadow: `0 0 6px ${TOKENS.neon}`,
        }}/>
        <div style={{
          fontFamily: TOKENS.display, fontWeight: 800,
          fontSize: 12, letterSpacing: '0.15em',
          color: TOKENS.text,
        }}>TWEAKS</div>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{
          fontFamily: TOKENS.mono, fontSize: 10, fontWeight: 600,
          letterSpacing: '0.2em', color: TOKENS.textMute,
          marginBottom: 10,
        }}>STYLE DE BULLES (CHAT)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {styles.map(s => (
            <button
              key={s.id}
              onClick={() => onChange({ bubbleStyle: s.id })}
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                background: values.bubbleStyle === s.id ? 'rgba(0, 255, 136, 0.1)' : 'transparent',
                border: `1px solid ${values.bubbleStyle === s.id ? TOKENS.lineStrong : TOKENS.line}`,
                color: TOKENS.text,
                cursor: 'pointer',
                fontFamily: TOKENS.body,
              }}
            >
              <div style={{
                fontFamily: TOKENS.display, fontWeight: 700,
                fontSize: 13, letterSpacing: '0.05em',
                color: values.bubbleStyle === s.id ? TOKENS.neon : TOKENS.text,
              }}>
                {s.label}
              </div>
              <div style={{
                fontFamily: TOKENS.mono, fontSize: 10,
                color: TOKENS.textMute, marginTop: 3,
              }}>{s.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    function onMsg(e) {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setEditMode(true);
      else if (d.type === '__deactivate_edit_mode') setEditMode(false);
    }
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const handleChange = (edits) => {
    setTweaks(t => ({ ...t, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  };

  return (
    <>
      <DesignCanvas>
        <DCSection id="s1" title="Bot ou pas Bot ?" subtitle="4 écrans · dark gaming · néon vert · FR">
          <DCArtboard id="home" label="01 · Homepage" width={1440} height={900}>
            <Homepage/>
          </DCArtboard>
          <DCArtboard id="chat" label="02 · Chat duel (focus)" width={1440} height={900}>
            <ChatDuel bubbleStyle={tweaks.bubbleStyle}/>
          </DCArtboard>
          <DCArtboard id="result" label="03 · Résultat + partage" width={1440} height={900}>
            <Result/>
          </DCArtboard>
          <DCArtboard id="lb" label="04 · Classement top 100" width={1440} height={900}>
            <Leaderboard/>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>
      <Tweaks open={editMode} values={tweaks} onChange={handleChange}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
