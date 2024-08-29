const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/checkout', (req, res) => {
    const productId = req.query.productId;
    // Retrieve product details based on productId and display checkout page
    res.send('Checkout page for product ${productId}');
});

app.post('/api/initiate-payment', async (req, res) => {
    const { amount, currency, reference } = req.body;

    try {
        const response = await axios.post('https://checkout-test.adyen.com/v67/payments', {
            amount: {
                currency: currency,
                value: amount,
            },
            reference: reference,
            merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
            paymentMethod: req.body.paymentMethod,
            returnUrl: 'http://localhost:3000/return',
        }, {
            headers: {
                'X-API-Key': process.env.ADYEN_API_KEY,
            },
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/webhook', (req, res) => {
    // Handle webhook notifications
    console.log('Webhook received:', req.body);
    res.send('[accepted]');
});

app.listen(port, () => {
    console.log('Server running on http://localhost:${port}');
});
