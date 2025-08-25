import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [accessToken, setAccessToken] = useState(null);
    const [tracks, setTracks] = useState([]);

    // Grab token from URL after login
    useEffect(() => {
        const hash = window.location.hash;
        const query = new URLSearchParams(window.location.search);
        const token = query.get('access_token');
        if (token) {
            setAccessToken(token);
            window.history.pushState({}, null, '/'); // remove tokens from URL
        }
    }, []);

    const login = () => {
        window.location.href = 'http://localhost:5000/login';
    };

    const fetchTopTracks = async () => {
        if (!accessToken) return;
        const res = await axios.get('http://localhost:5000/top-tracks', {
            params: { access_token: accessToken },
        });
        setTracks(res.data);
    };

    return (
        <div>
            {!accessToken ? (
                <button onClick={login}>Login with Spotify</button>
            ) : (
                <div>
                    <button onClick={fetchTopTracks}>Get My Top Tracks (last 4 weeks)</button>
                    <ul>
                        {tracks.map(track => (
                            <li key={track.id}>
                                {track.name} by {track.artists.map(a => a.name).join(', ')}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
