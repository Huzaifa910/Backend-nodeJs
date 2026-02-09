import express from "express";
import { chatbotController } from "../controllers/chatbotController.js";

const chatbotRoute = express.Router();

chatbotRoute.post("/chatbot", chatbotController);

export default chatbotRoute;