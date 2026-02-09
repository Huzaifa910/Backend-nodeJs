// import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const chatbotController = async (req, response) => {
  try {
    const body = req.body;
    const { message } = body;

    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAi.getGenerativeModel({
      generationConfig: {
        responseMimeType: "application/json",
      },
      model: "gemini-2.5-flash",
      systemInstruction:
        "you have to answer in detail and in the end of response you ask user that he/she want to ask something more?",
    });
    const res = await model.generateContent(message);
    console.log("res", res.response.text());

    response.json({
      ai: JSON.parse(res.response.text()),
    });
  } catch (error) {
    console.log("Chatbot error", error.message);
  }
};
