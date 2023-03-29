import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import env from "./env.js"
process.env['APIKEY'] = env.APIKEY;
process.env['ORGANISATION'] = env.ORGANISATION;
process.env['PORT'] = env.PORT;

console.log(process.env.APIKEY);

const configuration = new Configuration({
    organization: process.env.ORGANISATION,
    apiKey: process.env.APIKEY, 
});

const openai = new OpenAIApi(configuration);
const app = express();
// const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "user", content: "Hello World"},
        ],
    });
    res.json({
        completion: completion.data.choices[0].message,
    });
});

app.listen(process.env.PORT, () => {
    console.log(`App is listening at http://localhost:${process.env.PORT}`);
});