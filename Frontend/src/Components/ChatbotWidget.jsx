
import React, { useEffect, useRef, useState } from 'react';
import './ChatbotWidget.css';

// Backend URL must be configured in Netlify environment variables.
const API = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export default function ChatbotWidget({ heroOnly = false }) {
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'नमस्ते! Trayamb Associates में आपका स्वागत है। चैट शुरू करने के लिए पहले अपनी जानकारी भरें।',
    },
  ]);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  // Read API responses safely, including empty or non-JSON responses.
  async function readResponse(response) {
    const raw = await response.text();
    let data = {};

    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        data = { message: raw };
      }
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
        data.error ||
        `Server error (${response.status})`
      );
    }

    if (!raw) {
      throw new Error('Backend ने खाली response भेजा।');
    }

    return data;
  }

  function checkAPI() {
    if (!API) {
      throw new Error(
        'Backend URL सेट नहीं है। Netlify में VITE_API_URL सेट करके redeploy करें।'
      );
    }
  }

  async function start(e) {
    e.preventDefault();

    if (busy) return;

    setBusy(true);
    setError('');

    try {
      checkAPI();

      const response = await fetch(`${API}/chatbot/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          consent,
        }),
      });

      const data = await readResponse(response);

      // The backend should return the saved lead and leadId.
      if (!data.leadId) {
        throw new Error(
          'Lead save response में leadId नहीं मिला। Backend /chatbot/lead response जाँचें।'
        );
      }

      setLead(data);

      setMessages([
        {
          role: 'assistant',
          text: `नमस्ते ${data.name || name.trim()}! अब आप मकान निर्माण, इंटीरियर, नक्शे या बजट के बारे में पूछ सकते हैं। आपका प्रोजेक्ट किस प्रकार का है?`,
        },
      ]);
    } catch (err) {
      console.error('Chatbot lead error:', err);

      setError(
        `${err.message || 'जानकारी सेव नहीं हो सकी'}`
      );
    } finally {
      setBusy(false);
    }
  }

  async function send(e) {
    e.preventDefault();

    const text = input.trim();

    if (!text || !lead || busy) return;

    setInput('');
    setMessages((current) => [
      ...current,
      { role: 'user', text },
    ]);

    setBusy(true);

    try {
      checkAPI();

      const response = await fetch(`${API}/chatbot/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          leadId: lead.leadId,
          message: text,
        }),
      });

      const data = await readResponse(response);

      if (!data.reply) {
        throw new Error(
          'Backend response में AI reply नहीं मिला।'
        );
      }

      setMessages((current) => [
        ...current,
        { role: 'assistant', text: data.reply },
      ]);
    } catch (err) {
      console.error('Chatbot message error:', err);

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: `माफ़ कीजिए, जवाब नहीं मिल पाया: ${
            err.message || 'Backend connection जाँचें।'
          }`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`trayamb-chatbot${heroOnly ? ' tc-hero' : ''}`}>
      <button
        type="button"
        className="tc-launch"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open Trayamb AI chat"
        aria-expanded={open}
      >
        {open ? (
          '×'
        ) : (
          <>
            <span className="tc-dot" />
            Chat with us
          </>
        )}
      </button>

      {open && (
        <section
          className="tc-panel"
          aria-label="Trayamb AI Assistant"
        >
          <header className="tc-head">
            <div className="tc-avatar">T</div>

            <div>
              <strong>Trayamb AI Assistant</strong>
              <small>House &amp; Interior Guidance</small>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          {!lead ? (
            <form className="tc-form" onSubmit={start}>
              <h3>Start a conversation</h3>

              <p>
                चैट शुरू करने के लिए अपना नाम और मोबाइल नंबर भरें।
              </p>

              <label>
                पूरा नाम
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  required
                  placeholder="आपका नाम"
                />
              </label>

              <label>
                मोबाइल नंबर
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(/\D/g, '').slice(0, 10)
                    )
                  }
                  inputMode="numeric"
                  autoComplete="tel-national"
                  pattern="[6-9][0-9]{9}"
                  minLength={10}
                  maxLength={10}
                  required
                  placeholder="10 अंकों का नंबर"
                />
              </label>

              <label className="tc-consent">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                />

                <span>
                  मैं सहमत हूँ कि मेरी जानकारी मेरी पूछताछ का जवाब
                  देने के लिए सेव की जाए।
                </span>
              </label>

              {error && (
                <p className="tc-error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="tc-primary"
                disabled={busy}
              >
                {busy ? 'Saving...' : 'Save & Start Chat'}
              </button>

              <small className="tc-privacy">
                अपनी जानकारी केवल इस उद्देश्य के लिए दें।
              </small>
            </form>
          ) : (
            <>
              <div className="tc-messages" aria-live="polite">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`tc-message ${
                      message.role === 'user' ? 'tc-user' : ''
                    }`}
                  >
                    {message.text}
                  </div>
                ))}

                {busy && (
                  <div className="tc-message">
                    जवाब तैयार हो रहा है…
                  </div>
                )}

                <div ref={endRef} />
              </div>

              <form className="tc-send" onSubmit={send}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="अपना सवाल लिखें…"
                  maxLength={2000}
                  aria-label="अपना सवाल लिखें"
                  disabled={busy}
                />

                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send message"
                >
                  ➤
                </button>
              </form>
            </>
          )}
        </section>
      )}
    </div>
  );
}
