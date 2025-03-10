const Expense = require('../models/expense');
const Income = require('../models/income');
const axios = require('axios');

// Register new expense
exports.chat = async (req, res) => {
    try {
        const question = req.body.question || "Please provide a question.";

        // Set headers for SSE (Server-Sent Events)
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders();

        var context = "";
        var results = [];
        var augmentedPrompt = "";

        if(question.toLowerCase().includes("expense")) {
            const query = { $text: { $search: question } };
            results = await Expense.find(query).lean();
            context = results.map((doc) => `category:${doc.category}, amount: ${doc.amount}, date: ${doc.date}`).join('\n');
            augmentedPrompt = `Context:\nExpenses:\n${context}\n\Question: ${question}\nBot:`;

        }
        else if(question.toLowerCase().includes("income")) {
            const query = { $text: { $search: question } };
            results = await Income.find(query).lean();
            context = results.map((doc) => `source:${doc.source}, amount: ${doc.amount}, date: ${doc.date}`).join('\n');
            augmentedPrompt = `Context:\nIncome List:\n${context}\n\Question: ${question}\nBot:`;
        } 
        
        // Send the request to the Gemma 2:2b model
        const axiosResponse = await axios({
            method: "post",
            url: "http://localhost:11434/api/generate",
            data: {
                model: "gemma2:2b",
                prompt: augmentedPrompt,
            },
            responseType: "stream",
        });

        // Stream the response from the model to the client
        axiosResponse.data.on("data", (chunk) => {
            const chunkStr = chunk.toString();

            // Ensure the chunk is not empty before sending it
            if (chunkStr.trim()) {
                res.write(`data: ${chunkStr}\n\n`);
            }
        });

        // Handle the end of the stream
        axiosResponse.data.on("end", () => {
            res.write("data: [DONE]\n\n");
            res.end();
        });

        // Handle any errors during streaming
        axiosResponse.data.on("error", (error) => {
            console.error("Error during streaming:", error);
            res.write("data: Error occurred during streaming\n\n");
            res.end();
        });

    } catch (error) {
        console.error("Error during chat:", error);
        res.write("data: Error occurred during streaming\n\n");
        res.end();
    }
};
