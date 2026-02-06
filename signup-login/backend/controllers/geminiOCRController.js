import fs from "fs";
import { extractTextFromImage } from "../utils/geminiOCR.js";

export const geminiOCRController = async (req, res) => {
  try {
    // console.log("req file", req.file);
    if (!req.file) {
      return req.status(400).json({ message: "No image uploaded!" });
    }

    console.log("REQ.FILE:", req.file);
    const extractedFile = await extractTextFromImage(req.file.path);

    // image delete after processing
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      message: "Image Uploaded successfully...",
      text: extractedFile,
    });
  } catch (error) {
    // console.log("error uploading image: ", error.message);
    console.log("Gemini OCR file error", error.message);
    res.status(500).json({
      message: "error uploading image!",
      status: false,
    });
  }
};
