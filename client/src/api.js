// import axios from 'axios';

const API_BASE =
    process.env.NODE_ENV === 'production' ? 'https://spotify-top-api.onrender.com' : 'http://localhost:5000';
// const API_BASE = 'http://localhost:5000';

export const fetchTopTracks = async (accessToken, timeRange = 'short_term') => {
    const response = await fetch(`${API_BASE}/top-tracks?access_token=${accessToken}&time_range=${timeRange}`);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${errorData.error || 'Unknown error'}`);
    }

    return response.json();
};

// Create Playlist (POST)
export const fetchCreatePlaylist = async (accessToken, timeRange = 'short_term') => {
    const response = await fetch(`${API_BASE}/create-playlist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: accessToken, time_range: timeRange }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(`API Error: ${errorData.error || 'Unknown error'}`);
        error.statusCode = response.status;
        throw error;
    }

    return response.json();
};

// Add other API functions if you have them
export const fetchRecentlyPlayed = async accessToken => {
    const response = await fetch(`${API_BASE}/recently-played?access_token=${accessToken}`);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${errorData.error || 'Unknown error'}`);
    }

    return response.json();
};

export const fetchUserProfile = async accessToken => {
    const response = await fetch(`${API_BASE}/user-profile?access_token=${accessToken}`);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${errorData.error || 'Unknown error'}`);
    }

    return response.json();
};
