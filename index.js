import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import env from "./env.js"
process.env['APIKEY'] = env.APIKEY;
process.env['ORGANISATION'] = env.ORGANISATION;
process.env['PORT'] = env.PORT;

const configuration = new Configuration({
    organization: process.env.ORGANISATION,
    apiKey: process.env.APIKEY, 
});

const openai = new OpenAIApi(configuration);
const app = express();
// const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
    const { messages } = req.body;
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {"role": "system", "content": "You are HelpGPT, a helpful personal assitant chatbot"},
            ...messages
            //{role: "user", content: `${message}`},
        ],
    });
    res.json({
        completion: completion.data.choices[0].message,
    });
});

app.listen(process.env.PORT, () => {
    console.log(`App is listening at http://localhost:${process.env.PORT}`);
});