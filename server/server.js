const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const SpotifyWebApi = require('spotify-web-api-node');

dotenv.config();
const app = express();
app.use(cors());

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Step 1. Login route
app.get('/login', (req, res) => {
    const scopes = ['user-top-read'];
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, null, true); // third parameter forces dialog
    res.redirect(authorizeURL);
});

// Step 2. Callback route
app.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    try {
        const data = await spotifyApi.authorizationCodeGrant(code);
        const { access_token, refresh_token, expires_in } = data.body;

        // Redirect to frontend with tokens in query (simplest way)
        res.redirect(
            `${process.env.FRONTEND_URI}/?access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`
        );
    } catch (err) {
        console.error(err);
        res.send('Error during authentication');
    }
});

// Step 3. Get top tracks endpoint
app.get('/top-tracks', async (req, res) => {
    const token = req.query.access_token; // frontend sends it
    if (!token) return res.status(400).send('No token provided');

    spotifyApi.setAccessToken(token);
    try {
        const data = await spotifyApi.getMyTopTracks({ limit: 10, time_range: 'short_term' });
        res.json(data.body.items);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching top tracks');
    }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
