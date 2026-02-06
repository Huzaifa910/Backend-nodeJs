import { geminiOCRController } from "../controllers/geminiOCRController.js";
import { upload } from "../middleware/multerMiddleware.js";
import express from "express";

export const imageRoute = express.Router();

imageRoute.post("/upload", upload.single("image"), geminiOCRController);
