const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const SpotifyWebApi = require('spotify-web-api-node');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Step 1. Login route
app.get('/login', (req, res) => {
    const scopes = [
        'user-top-read',
        'user-library-read',
        'user-read-recently-played',
        'playlist-modify-private', // <-- Add this
        // 'playlist-modify-public', // <-- Optional, for public playlists
    ];
    const state = 'login_flow';
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, true); // third parameter forces dialog
    res.redirect(authorizeURL);
});

// Step 2. Callback route
app.get('/auth/callback', async (req, res) => {
    const code = req.query.code || null;
    try {
        const data = await spotifyApi.authorizationCodeGrant(code);
        const { access_token, refresh_token, expires_in } = data.body;

        // Render a small HTML page with tokens in query params
        res.send(`
      <html>
        <body>
          <script>
            // Build query params from backend
            const params = new URLSearchParams({
              access_token: "${access_token}",
              refresh_token: "${refresh_token}",
              expires_in: "${expires_in}"
            });
            // Redirect to frontend using hash (#) instead of ?
            window.location.href = "${process.env.FRONTEND_URI}/#" + params.toString();
          </script>
        </body>
      </html>
    `);
    } catch (err) {
        console.error(err);
        res.send('Error during authentication');
    }
});

app.get('/top-tracks', async (req, res) => {
    const token = req.query.access_token;
    const timeRange = req.query.time_range || 'short_term';

    if (!token) return res.status(400).send('No token provided');

    spotifyApi.setAccessToken(token);
    try {
        const data = await spotifyApi.getMyTopTracks({
            limit: 10,
            time_range: timeRange,
        });
        console.log(`Success (${timeRange}): Found`, data.body.items.length, 'tracks');
        res.json(data.body.items);
    } catch (err) {
        console.error('Full error object:', JSON.stringify(err, null, 2));
        console.error('Error message:', err.message);
        console.error('Status code:', err.statusCode);

        // Handle specific 403 case
        if (err.statusCode === 403) {
            res.status(403).json({
                error: 'Insufficient permissions or no listening history available',
                suggestion:
                    'This account may not have enough Spotify listening history, or needs additional permissions.',
            });
        } else {
            res.status(err.statusCode || 500).json({
                error: err.message || 'Unknown error',
                statusCode: err.statusCode,
            });
        }
    }
});

// Fallback: Get recently played tracks
app.get('/recently-played', async (req, res) => {
    const token = req.query.access_token;
    if (!token) return res.status(400).send('No token provided');

    spotifyApi.setAccessToken(token);
    try {
        const data = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 10 });
        console.log('Recently played tracks:', data.body.items.length);
        res.json(data.body.items.map(item => item.track)); // Extract just the track info
    } catch (err) {
        console.error('Recently played error:', err);
        res.status(err.statusCode || 500).json({ error: err.message });
    }
});

// Check user profile
app.get('/user-profile', async (req, res) => {
    const token = req.query.access_token;
    if (!token) return res.status(400).send('No token provided');

    spotifyApi.setAccessToken(token);
    try {
        const data = await spotifyApi.getMe();
        console.log('User profile:', data.body);
        res.json(data.body);
    } catch (err) {
        console.error('Profile error:', err);
        res.status(err.statusCode || 500).json({ error: err.message });
    }
});

app.post('/create-playlist', async (req, res) => {
    const token = req.body?.access_token;
    const timeRange = req.body?.time_range || 'short_term';

    if (!token) return res.status(400).send('No token provided');

    spotifyApi.setAccessToken(token);

    try {
        // Get top tracks
        const topTracksData = await spotifyApi.getMyTopTracks({
            limit: 20,
            time_range: timeRange,
        });
        const trackUris = topTracksData.body.items.map(track => track.uri);

        // Create a new playlist (v5+)
        const playlistData = await spotifyApi.createPlaylist(
            `Top Songs ${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
                new Date()
            )} ${new Date().getFullYear()}`,
            {
                description: `My top 20 most played songs of ${new Intl.DateTimeFormat('en-US', {
                    month: 'long',
                }).format(new Date())} ${new Date().getFullYear()}`,
                public: false,
            }
        );

        // Add tracks to playlist
        await spotifyApi.addTracksToPlaylist(playlistData.body.id, trackUris);

        res.json({
            playlistId: playlistData.body.id,
            playlistUrl: playlistData.body.external_urls.spotify,
            name: playlistData.body.name,
        });
    } catch (err) {
        console.error('Create playlist error:', err);

        if (err.statusCode === 403) {
            res.status(403).json({
                error: 'Insufficient permissions or no listening history available',
                suggestion:
                    'This account may not have enough Spotify listening history, or needs additional permissions.',
            });
        } else {
            res.status(err.statusCode || 500).json({
                error: err.message || 'Unknown error',
                statusCode: err.statusCode || 500,
            });
        }
    }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
