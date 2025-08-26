import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const fetchTopTracks = accessToken => {
    return axios
        .get(`${API_BASE}/top-tracks`, {
            params: { access_token: accessToken },
        })
        .then(res => res.data);
};
