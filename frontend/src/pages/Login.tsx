import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #a5b4fc 0%, #6366f1 100%)',
        overflow: 'hidden',
        zIndex: 1000,
      }}>
        {/* Decorative SVG background */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="login-bg" cx="50%" cy="50%" r="80%" fx="50%" fy="50%" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" stopOpacity="0.25" />
            <stop offset="1" stopColor="#6366f1" stopOpacity="0.09" />
          </radialGradient>
        </defs>
        <ellipse cx="900" cy="300" rx="500" ry="250" fill="url(#login-bg)" />
        <ellipse cx="200" cy="700" rx="300" ry="100" fill="#6366f1" opacity="0.08" />
      </svg>
      <form onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 370,
          margin: '0 auto',
          background: 'rgba(255,255,255,0.69)',
          borderRadius: 22,
          boxShadow: '0 8px 40px #6366f133, 0 2px 12px #a5b4fc33',
          padding: '36px 30px 28px',
          position: 'relative',
          backdropFilter: 'blur(13px)',
          WebkitBackdropFilter: 'blur(13px)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Logo/Icon */}
        <div style={{ marginBottom: 16, marginTop: -8 }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="7" width="34" height="34" rx="9" fill="#6366f1" fillOpacity="0.92"/>
            <rect x="13" y="13" width="22" height="22" rx="5" fill="#fff" fillOpacity="0.9"/>
            <rect x="19" y="19" width="10" height="10" rx="3" fill="#6366f1"/>
          </svg>
        </div>
        <h2 style={{
          textAlign: 'center',
          marginBottom: 18,
          fontWeight: 700,
          fontSize: 27,
          letterSpacing: 0.5,
          background: 'linear-gradient(90deg,#6366f1 40%,#3b82f6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>Sign In</h2>
        {error && <div style={{ color: '#e11d48', marginBottom: 10, fontWeight: 500, fontSize: 15 }}>{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px 13px',
            marginBottom: 16,
            borderRadius: 8,
            border: '1.7px solid #a5b4fc',
            fontSize: 16,
            outline: 'none',
            transition: 'border 0.18s, box-shadow 0.18s',
            boxShadow: '0 1.5px 8px #a5b4fc22',
            background: 'rgba(255,255,255,0.85)',
          }}
          onFocus={e => e.currentTarget.style.border = '2.2px solid #6366f1'}
          onBlur={e => e.currentTarget.style.border = '1.7px solid #a5b4fc'}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px 13px',
            marginBottom: 18,
            borderRadius: 8,
            border: '1.7px solid #a5b4fc',
            fontSize: 16,
            outline: 'none',
            transition: 'border 0.18s, box-shadow 0.18s',
            boxShadow: '0 1.5px 8px #a5b4fc22',
            background: 'rgba(255,255,255,0.85)',
          }}
          onFocus={e => e.currentTarget.style.border = '2.2px solid #6366f1'}
          onBlur={e => e.currentTarget.style.border = '1.7px solid #a5b4fc'}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: 'linear-gradient(90deg,#6366f1 0%,#3b82f6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '13px 0',
            fontWeight: 700,
            fontSize: 18,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: 8,
            marginTop: 2,
            boxShadow: '0 2px 16px #6366f144',
            transition: 'background 0.18s, box-shadow 0.18s, transform 0.13s',
            outline: 'none',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >{loading ? 'Signing in...' : 'Login'}</button>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 15 }}>
          <span style={{ color: '#232946' }}>Don't have an account? </span>
          <a
            href="/register"
            style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none', marginLeft: 3, transition: 'color 0.16s' }}
            onMouseOver={e => e.currentTarget.style.color = '#3b82f6'}
            onMouseOut={e => e.currentTarget.style.color = '#6366f1'}
          >Register</a>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;
