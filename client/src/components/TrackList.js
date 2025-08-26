import React from 'react';
import TrackRow from './TrackRow';

export default function TrackList({ tracks }) {
    if (!tracks || tracks.length === 0) {
        return (
            <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'black' }}>No tracks loaded yet.</p>
            </div>
        );
    }

    return (
        <div
            style={{
                marginTop: '25px',
                // width: '100vw',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #92b8ffff 0%, #fab1b1ff 100%)',
                margin: '0',
                padding: '20px',
                boxSizing: 'border-box',
                position: 'relative',
            }}
        >
            <div>
                <h2
                    style={{
                        color: '#1b191bff',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        margin: '0px 0px 4px 20px',
                    }}
                >
                    My Spotify Top Tracks
                </h2>
                <h3
                    style={{
                        color: '#3f3f3fff',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        margin: '0px 0px 16px 20px',
                    }}
                >
                    Last Month
                </h3>
                {tracks.slice(0, 10).map((track, index) => (
                    <TrackRow key={track.id} track={track} index={index} />
                ))}
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
            </div>
        </div>
    );
}
