require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai'); // Change this line to use require

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Endpoint to handle chat messages
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // const response = await openai.chat.completions.create({
        //     model: 'gpt-4o',
        //     messages: [{ role: 'user', content: userMessage }],
        // });

        const response = await axios.post('https://chatgpt.com/g/g-678feaab25a481919cc5a64532c7d950-crypto-wallet', {
            prompt: message,
            // Include any other necessary parameters based on your custom GPT setup
        });

        const botMessage = response.choices[0].message.content;
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