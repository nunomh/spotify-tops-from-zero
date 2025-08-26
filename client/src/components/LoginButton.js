import React from 'react';

export default function LoginButton() {
    const login = () => {
        window.location.href = 'http://localhost:5000/login';
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
                margin: '0 auto',
                display: 'block',
            }}
        >
            <span style={{ marginRight: '12px', fontWeight: 900 }}>🎧</span>
            Login with Spotify
        </button>
    );
}
