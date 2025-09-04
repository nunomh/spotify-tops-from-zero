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
                height: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #92b8ffff 0%, #fab1b1ff 100%)',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    height: '100%',
                }}
            >
                <h2
                    style={{
                        color: '#1b191bff',
                        fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                        fontWeight: 700,
                        margin: '20px 0 4px 20px',
                    }}
                >
                    My Spotify Top Tracks
                </h2>
                <h3
                    style={{
                        color: '#3f3f3fff',
                        fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                        fontWeight: 700,
                        margin: '0 0 16px 20px',
                    }}
                >
                    Last Month
                </h3>
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        padding: '0 12px 0 12px',
                        justifyContent: 'center',
                        overflow: 'auto', // allow scrolling if needed
                        maxHeight: 'calc(100vh - 180px)', // adjust for header/footer
                    }}
                >
                    {tracks.slice(0, 10).map((track, index) => (
                        <div
                            key={track.id || index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'clamp(8px, 1vw, 16px)',
                                borderRadius: 'clamp(12px, 2vw, 20px)',
                                padding: 'clamp(2px, 1vw, 6px) clamp(4px, 1vw, 8px)',
                                margin: '0 clamp(4px, 2vw, 4px)',
                                marginBottom: 0,
                                background: 'none',
                                boxShadow: 'none',
                                flex: '1 1 0', // let each row grow/shrink equally
                                minHeight: 0, // remove fixed minHeight
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 'clamp(0.9rem, 2vw, 1.3rem)',
                                    fontWeight: 700,
                                    width: 'clamp(24px, 4vw, 40px)',
                                    textAlign: 'right',
                                    color: '#1b191bff',
                                    textShadow: '0 1px 4px #0002',
                                }}
                            >
                                {index + 1}
                            </div>
                            <img
                                src={track.album.images[0]?.url}
                                alt={track.name}
                                style={{
                                    width: 'clamp(40px, 8vw, 72px)', // larger image
                                    height: 'clamp(40px, 8vw, 72px)', // larger image
                                    objectFit: 'cover',
                                    borderRadius: 'clamp(6px, 1vw, 12px)',
                                    boxShadow: 'none',
                                }}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 1,
                                    minWidth: 0,
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 'clamp(1rem, 2vw, 1.3rem)', // a bit smaller
                                        fontWeight: 600,
                                        marginBottom: 'clamp(2px, 0.5vw, 6px)',
                                        color: '#1b191bff',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {track.name}
                                </span>
                                <span
                                    style={{
                                        fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', // a bit smaller
                                        opacity: 0.85,
                                        color: '#1b191bff',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {track.artists.map(a => a.name).join(', ')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <footer
                    style={{
                        textAlign: 'center',
                        fontSize: 'clamp(0.7rem, 1vw, 0.8rem)',
                        color: 'rgba(0,0,0,0.6)',
                        padding: '16px',
                        marginTop: 'auto',
                    }}
                >
                    2025 • made by @nameless.shelf
                </footer>
            </div>
        </div>
    );
}
