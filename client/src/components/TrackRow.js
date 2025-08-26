import React from 'react';

export default function TrackRow({ track, index }) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px', // Reduced gap
                // background: 'rgba(0,0,0,0.10)',
                borderRadius: '16px', // Smaller radius
                padding: '8px 12px', // Smaller padding
                // boxShadow: '0 1px 4px rgba(0,0,0,0.08)', // Smaller shadow
            }}
        >
            <div
                style={{
                    fontSize: '1.5rem', // Smaller font
                    fontWeight: 700,
                    width: '32px', // Smaller width
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
                    width: '56px', // Smaller image
                    height: '56px', // Smaller image
                    objectFit: 'cover',
                    borderRadius: '8px', // Smaller radius
                    boxShadow: '0 2px 8px rgba(0,0,0,0.18)', // Smaller shadow
                }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span
                    style={{
                        fontSize: '1.1rem', // Smaller font
                        fontWeight: 600,
                        marginBottom: '3px', // Smaller margin
                        color: '#1b191bff',
                    }}
                >
                    {track.name}
                </span>
                <span
                    style={{
                        fontSize: '0.85rem', // Smaller font
                        opacity: 0.85,
                        color: '#1b191bff',
                    }}
                >
                    {track.artists.map(a => a.name).join(', ')}
                </span>
            </div>
        </div>
    );
}
