import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { fetchTopTracks } from './api';
import LoginButton from './components/LoginButton';
import TrackList from './components/TrackList';

function App() {
    const [accessToken, setAccessToken] = useState(null);
    const [tracks, setTracks] = useState([]);
    const imageRef = useRef();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('access_token');
        if (token) {
            setAccessToken(token);
            window.history.pushState({}, null, '/');
        }
    }, []);

    const handleGetTracks = async () => {
        if (!accessToken) return;
        const data = await fetchTopTracks(accessToken);
        setTracks(data);
    };

    const handleDownloadImage = async () => {
        if (!imageRef.current) return;
        const canvas = await html2canvas(imageRef.current, { scale: 2 });
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'spotify-top-tracks.png';
        link.click();
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #92b8ffff 0%, #fab1b1ff 100%)',
                fontFamily: 'Inter, Arial, sans-serif',
            }}
        >
            <div
                style={{
                    // maxWidth: '600px',
                    margin: '0 auto',
                    padding: '32px 0px 0px 0px',
                }}
            >
                {!accessToken ? (
                    <LoginButton />
                ) : (
                    <div>
                        {/* <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}> */}
                        <button
                            onClick={handleGetTracks}
                            style={{
                                background: '#92b8ffff',
                                color: '#1b191bff',
                                padding: '12px 24px',
                                borderRadius: '999px',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                border: '1px solid rgba(27, 25, 27, 0.3)',
                                cursor: 'pointer',
                                transition: 'background 0.2s',
                                margin: '0 auto',
                                display: 'block',
                            }}
                        >
                            <span style={{ marginRight: '8px', fontWeight: 900 }}>🎵</span>
                            Get My Top Tracks (last 4 weeks)
                        </button>
                        {/* </div> */}

                        <TrackList tracks={tracks} />
                    </div>
                )}
            </div>
            {tracks.length == 0 && (
                <footer
                    style={{
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        color: 'rgba(0,0,0,0.6)',
                        padding: '16px',
                        marginTop: 'auto',
                    }}
                >
                    2025 • Developed by @nameless.shelf
                </footer>
            )}
        </div>
    );
}

export default App;
