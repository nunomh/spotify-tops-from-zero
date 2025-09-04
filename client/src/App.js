import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { fetchTopTracks, fetchRecentlyPlayed, fetchUserProfile, fetchCreatePlaylist } from './api';
import LoginButton from './components/LoginButton';
import TrackList from './components/TrackList';

// Popup component
function Popup({ message, onClose }) {
    if (!message) return null;
    return (
        <div
            style={{
                position: 'fixed',
                top: '32px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#191414',
                color: '#fff',
                padding: '18px 32px',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                zIndex: 9999,
                fontSize: '1.1rem',
                fontWeight: 600,
                textAlign: 'center',
                width: 'fit-content',
                minWidth: '300px',
            }}
        >
            <div style={{ marginBottom: '16px' }}>
                {/* <span style={{ marginRight: '12px' }}>⚠️</span> */}
                <span>{message}</span>
            </div>
            <button
                onClick={onClose}
                style={{
                    background: '#1db954',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                }}
            >
                Close
            </button>
        </div>
    );
}

function App() {
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem('access_token'));
    const [tracks, setTracks] = useState([]);
    const [popup, setPopup] = useState('');
    const imageRef = useRef();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('access_token');
        const expiresIn = query.get('expires_in');

        if (token) {
            setAccessToken(token);
            localStorage.setItem('access_token', token);
            if (expiresIn) {
                const expiryTime = Date.now() + parseInt(expiresIn) * 1000;
                localStorage.setItem('token_expiry', expiryTime.toString());
            }
            window.history.replaceState({}, null, '/');
        } else {
            // Check expiry
            const expiryTime = localStorage.getItem('token_expiry');
            if (expiryTime && Date.now() > parseInt(expiryTime)) {
                setAccessToken(null);
                localStorage.removeItem('access_token');
                localStorage.removeItem('token_expiry');
            }
        }
    }, []);

    const handleLogout = () => {
        setAccessToken(null);
        setTracks([]);
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_expiry');
    };

    const handleGetTracks = async () => {
        if (!accessToken) return;

        try {
            // First try top tracks with different time ranges
            let data = null;
            let time_range = '';
            const timeRanges = ['short_term', 'medium_term', 'long_term'];

            for (const range of timeRanges) {
                try {
                    data = await fetchTopTracks(accessToken, range);
                    if (data && data.length > 0) {
                        console.log(`Success with ${range} time range`);
                        setTracks(data);
                        time_range = range;
                        return;
                    }
                } catch (err) {
                    console.log(`${range} failed:`, err.message);
                    continue;
                }
            }

            if (time_range == 'medium_term' || time_range == 'long_term') {
                // If we have a valid time range, we can use it
                console.log(`Using ${time_range} time range for top tracks`);
                setPopup(
                    `Not enough data available for a monthly top.` +
                        (time_range == 'medium_term'
                            ? ' Switching to 6 month top tracks.'
                            : ' Switching to 1 year top tracks.')
                );
            }

            // If all top tracks fail, try recently played
            console.log('Trying recently played tracks...');
            const recentData = await fetchRecentlyPlayed(accessToken);
            setTracks(recentData);
            setPopup('Showing recently played tracks instead (no top tracks available for this account)');
        } catch (err) {
            console.error('All methods failed:', err);
            setPopup('This account may not have enough listening history. Try playing some music on Spotify first!');
        }
    };

    const handleCreatePlaylist = async () => {
        if (!accessToken) return;

        try {
            let data = null;
            const timeRanges = ['short_term', 'medium_term', 'long_term'];

            for (const range of timeRanges) {
                try {
                    data = await fetchCreatePlaylist(accessToken, range);
                    if (data && data.playlistId) {
                        console.log(`Success with ${range} time range`);
                        setPopup('Playlist created successfully!');
                        return;
                    }
                } catch (err) {
                    console.log(`${range} failed:`, err.message);
                    continue;
                }
            }
        } catch (err) {
            console.error('All methods failed:', err);
            setPopup('This account may not have enough listening history. Try playing some music on Spotify first!');
        }
    };

    // const handleLogout = () => {
    //     setAccessToken(null);
    //     setTracks([]);
    //     localStorage.removeItem('token_expiry');
    // };

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #92b8ffff 0%, #fab1b1ff 100%)',
                fontFamily: 'Inter, Arial, sans-serif',
            }}
        >
            <Popup message={popup} onClose={() => setPopup('')} />
            <div style={{ margin: '0 auto', padding: '32px 0px 0px 0px' }}>
                {!accessToken ? (
                    <LoginButton />
                ) : (
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '16px',
                                justifyContent: 'center',
                                marginBottom: '16px',
                            }}
                        >
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
                                    display: 'inline-block',
                                }}
                            >
                                <span style={{ marginRight: '8px', fontWeight: 900 }}>🎵</span>
                                Get My Top Tracks (last 4 weeks)
                            </button>

                            <button
                                onClick={handleCreatePlaylist}
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
                                    display: 'inline-block',
                                }}
                            >
                                <span style={{ marginRight: '8px', fontWeight: 900 }}>🎵</span>
                                Create Playlist with My Top Tracks
                            </button>

                            <button
                                onClick={handleLogout}
                                style={{
                                    background: '#191414',
                                    color: '#fff',
                                    padding: '10px 22px',
                                    borderRadius: '999px',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    border: '1px solid #1db954',
                                    cursor: 'pointer',
                                    display: 'inline-block',
                                }}
                            >
                                Logout
                            </button>
                        </div>
                        <TrackList tracks={tracks} />
                    </div>
                )}
            </div>
            {tracks.length === 0 && (
                <footer
                    style={{
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        color: 'rgba(0,0,0,0.6)',
                        padding: '16px',
                        marginTop: 'auto',
                    }}
                >
                    2025 • made by @nameless.shelf • v0.0.4
                </footer>
            )}
        </div>
    );
}

export default App;
