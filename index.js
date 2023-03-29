import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const configuration = new Configuration({
    organization: "org-e6uvyvH9iYROGvwRwxTL8ha5",
    apiKey: "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", 
});

const openai = new OpenAIApi(configuration);
const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});