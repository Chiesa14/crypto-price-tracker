require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const axios = require('axios');
const cron = require('node-cron');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());

// Fetching environment variables
const PORT = process.env.PORT || 5000;
const COINGECKO_API_URL = process.env.COINGECKO_API_URL;
const CRYPTO_IDS = process.env.CRYPTO_IDS;
const CURRENCY = process.env.CURRENCY;

let livePrices = {};

// Function to fetch live prices from CoinGecko
const fetchLivePrices = async () => {
    try {
        const response = await axios.get(COINGECKO_API_URL, {
            params: {
                ids: CRYPTO_IDS,
                vs_currency: CURRENCY,
            },
        });
        livePrices = response.data;
        console.log('Fetched live prices:', livePrices);

        // Send price updates to all connected clients
        io.emit('priceUpdate', livePrices);
    } catch (error) {
        console.error('Error fetching prices from CoinGecko:', error.message);
    }
};

cron.schedule('* * * * *', fetchLivePrices);

fetchLivePrices();

io.on('connection', (socket) => {
    console.log('Connected to client');

    if (Object.keys(livePrices).length > 0) {
        socket.emit('priceUpdate', livePrices);
    }

    socket.on('disconnect', () => {
        console.log('Disconnected from client');
    });
});

app.post('/send', (req, res) => {
    const message = req.body.message;
    console.log('Notification:', message);
    io.emit('pushNotification', { message });

    res.status(200).send({
        message: 'Sent successfully',
    });
});

app.get('/api/prices', (req, res) => {
    if (Object.keys(livePrices).length === 0) {
        return res.status(503).json({ message: 'Live prices not available yet. Try again shortly.' });
    }
    res.json(livePrices);
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
