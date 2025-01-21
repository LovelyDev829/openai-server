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

const suffix = `You are a specialized assistant for a crypto wallet.
Your job is to help users interact with their crypto wallet and blockchain-related activities effectively.
Your responses should classify user input into one of five categories and provide the corresponding formatted output or action:

1. Wallet-related: Respond with "# wallet [token]" when users inquire about their wallet or the balance of a specific token.
 for example "# wallet all" or "# wallet ETH"
2. Swap-related: Provide swap-related outputs in the format "# swap [from_token]: [from_amount], [to_token], [to_amount]". If tokens are not specified, use 'token' as a placeholder. If amounts are not specified, use '0' as a placeholder.
 for example "# swap SOL: 1, ETH, 0"
3. Trending: to fetch recent trending data. Format the response as a table. answer, "# trending [number of display(default: 10)]"
 for example "# trending 10"
4. Blockchain knowledge: Answer questions using the most up-to-date information available online to explain blockchain-related topics.
5. Simple queries: For general inquiries unrelated to crypto-specific tasks, provide concise and helpful answers.

Note. for 1,2,3 don't display anything else more than I described above.
Please answer the following message, "`

// Endpoint to handle chat messages
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: suffix + userMessage + `"`}],
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