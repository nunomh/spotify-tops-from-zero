import React from 'react';

export default function LoginButton() {
    const login = () => {
        const url =
            process.env.NODE_ENV === 'production'
                ? 'https://spotify-top-api.onrender.com/login'
                : 'http://localhost:5000/login';
        window.location.href = url;
    };

    return (
        <button
            onClick={login}
            style={{
                background: '#92b8ffff',
                color: 'black',
                padding: '16px 32px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '1.2rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
                border: '1px solid rgba(27, 25, 27, 0.3)',
                margin: '0 auto',
                display: 'block',
            }}
        >
            <span style={{ marginRight: '12px', fontWeight: 900 }}>🎧</span>
            Login with Spotify
        </button>
    );
}
