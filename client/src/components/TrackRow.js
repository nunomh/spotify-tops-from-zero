import React from 'react';

export default function TrackRow({ track, index }) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(12px, 2vw, 24px)', // Responsive gap
                borderRadius: 'clamp(12px, 2vw, 20px)', // Responsive border radius
                padding: 'clamp(4px, 1.5vw, 8px) clamp(6px, 2vw, 8px)', // Responsive padding
                margin: '0 clamp(4px, 2vw, 4px)', // Responsive horizontal margins
                marginBottom: 'clamp(8px, 1vw, 12px)', // Responsive bottom margin
            }}
        >
            <div
                style={{
                    fontSize: 'clamp(1.2rem, 3vw, 1.3rem)', // Responsive font size
                    fontWeight: 700,
                    width: 'clamp(28px, 5vw, 40px)', // Responsive width
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
                    width: 'clamp(48px, 8vw, 60px)', // Responsive image size
                    height: 'clamp(48px, 8vw, 60px)', // Responsive image size
                    objectFit: 'cover',
                    borderRadius: 'clamp(6px, 1vw, 12px)', // Responsive border radius
                    boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                }}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minWidth: 0, // Prevents text overflow issues
                }}
            >
                <span
                    style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', // Responsive font size
                        fontWeight: 600,
                        marginBottom: 'clamp(2px, 0.5vw, 6px)', // Responsive margin
                        color: '#1b191bff',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap', // Prevents text wrapping on small screens
                    }}
                >
                    {track.name}
                </span>
                <span
                    style={{
                        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', // Responsive font size
                        opacity: 0.85,
                        color: '#1b191bff',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap', // Prevents text wrapping on small screens
                    }}
                >
                    {track.artists.map(a => a.name).join(', ')}
                </span>
            </div>
        </div>
    );
}
