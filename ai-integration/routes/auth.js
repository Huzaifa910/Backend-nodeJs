import express from "express";
import { chatbot } from "../controller/chatbot.js";

const authRoute = express.Router();

authRoute.post("/chatbot", chatbot);

export default authRoute;
