const express = require("express");
const router = express.Router();
const axios = require("axios");

const openRouterConfig = {
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
};

router.post('/chatbotai', async (req, res) => {
  try {
    const { userMessage } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: "User message is required" });
    }

    const messages = [
      { role: "system", content: "You are an AI assistant in a pharmacy store. Customers ask about medications, prescriptions, and recommendations." },
      { role: "user", content: userMessage }
    ];

    const response = await axios.post(
      `${openRouterConfig.baseURL}/chat/completions`,
      {
        model:"google/gemini-2.0-flash-thinking-exp:free",
        messages: messages,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${openRouterConfig.apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiMessage = response.data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    res.json({ response: aiMessage });
  } catch (error) {
    console.error("Error generating response:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to generate response",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
