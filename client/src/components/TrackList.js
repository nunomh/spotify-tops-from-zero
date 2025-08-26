import React from 'react';
import TrackRow from './TrackRow';

export default function TrackList({ tracks }) {
    if (!tracks || tracks.length === 0) {
        return <p style={{ color: 'black' }}>No tracks loaded yet.</p>;
    }

    return (
        <div>
            <h2
                style={{
                    // textAlign: 'center',
                    // marginBottom: '24px',
                    color: '#1b191bff',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    margin: '0px 0px 4px 20px',
                }}
            >
                Top Tracks
            </h2>
            {/* <hr style={{ border: 'none', borderTop: '1px solid #0002' }} /> */}
            <h3
                style={{
                    // textAlign: 'center',
                    // marginBottom: '24px',
                    color: '#3f3f3fff',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    margin: '0px 0px 16px 20px',
                }}
            >
                Last Month
            </h3>
            {/* <hr style={{ border: 'none', borderTop: '1px solid #0002' }} /> */}
            {tracks.slice(0, 10).map((track, index) => (
                <TrackRow key={track.id} track={track} index={index} />
            ))}
        </div>
    );
}
