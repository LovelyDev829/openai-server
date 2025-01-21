require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Use Axios for custom requests

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

// Endpoint to handle chat messages
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Replace with your custom GPT endpoint
        const response = await axios.post(
            'https://chatgpt.com/g/g-678feaab25a481919cc5a64532c7d950-crypto-wallet',
            {
                messages: [{ role: 'user', content: userMessage }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.CUSTOM_API_KEY}`, // Set your custom API key in .env
                    'Content-Type': 'application/json',
                },
            }
        );

        const botMessage = response.data.choices[0].message.content;
        res.json({ reply: botMessage });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
