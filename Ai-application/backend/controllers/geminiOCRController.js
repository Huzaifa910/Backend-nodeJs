// import fs from "fs";
// import { extractTextFromImage } from "../utils/geminiOCR.js";

// export const geminiOCRController = async (req, res) => {
//   try {
//     // console.log("req file", req.file);
//     if (!req.file) {
//       return req.status(400).json({ message: "No image uploaded!" });
//     }

//     console.log("REQ.FILE:", req.file);
//     const extractedFile = await extractTextFromImage(req.file.path);

//     // image delete after processing
//     fs.unlinkSync(req.file.path);

//     res.json({
//       success: true,
//       message: "Image Uploaded successfully...",
//       text: extractedFile,
//     });
//   } catch (error) {
//     // console.log("error uploading image: ", error.message);
//     console.log("Gemini OCR file error", error.message);
//     res.status(500).json({
//       message: "error uploading image!",
//       status: false,
//     });
//   }
// };



// geminiOCRController.js - UPDATED
// import fs from "fs";
// import { extractTextFromImage } from "../utils/geminiOCR.js";

// export const geminiOCRController = async (req, res) => {
//   try {
//     // 1. Check if file exists
//     if (!req.file) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "No image uploaded!" 
//       });
//     }
    
//     console.log("Processing file:", req.file.path);
//     console.log("File size:", req.file.size, "bytes");
    
//     // 2. Extract text from image
//     const extractedText = await extractTextFromImage(req.file.path);
    
//     // 3. Delete the temporary file
//     if (fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//       console.log("Temporary file deleted");
//     }
    
//     // 4. Send response
//     res.json({
//       success: true,
//       message: "Text extracted successfully!",
//       text: extractedText
//     });
    
//   } catch (error) {
//     console.log("Controller Error:", error.message);
    
//     // 5. Cleanup in case of error
//     if (req.file && fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }
    
//     res.status(500).json({
//       success: false,
//       message: "Error extracting text from image",
//       error: error.message,
//       tip: "Check if you're using gemini-1.5-flash or gemini-1.5-pro model"
//     });
//   }
// };




// controllers/geminiOCRController.js - UPDATE THIS
import fs from "fs";
import { extractTextFromImage } from "../utils/geminiOCR.js";

export const geminiOCRController = async (req, res) => {
  try {
    console.log("=== OCR CONTROLLER STARTED ===");
    console.log("Request received");
    console.log("File exists?", !!req.file);
    
    // 1. Check if file uploaded
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "Koi image upload nahi hui!",
        tip: "Postman mein 'form-data' use karo aur field ka naam 'image' rakho"
      });
    }
    
    console.log("File details:", {
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      originalname: req.file.originalname
    });
    
    // 2. Verify file exists on disk
    if (!fs.existsSync(req.file.path)) {
      return res.status(400).json({
        success: false,
        message: "Temporary file not saved properly"
      });
    }
    
    console.log("Calling extractTextFromImage...");
    
    // 3. Extract text
    const extractedText = await extractTextFromImage(req.file.path);
    
    console.log("Text extracted. Length:", extractedText.length);
    
    // 4. Delete temporary file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
      console.log("Temporary file deleted:", req.file.path);
    }
    
    // 5. Send success response
    res.json({
      success: true,
      message: "Text successfully extracted!",
      text: extractedText,
      textLength: extractedText.length
    });
    
    console.log("=== OCR CONTROLLER ENDED SUCCESSFULLY ===");
    
  } catch (error) {
    console.error("=== OCR CONTROLLER ERROR ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    // 6. Cleanup on error
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
        console.log("Cleaned up file after error");
      } catch (cleanupError) {
        console.error("Cleanup error:", cleanupError.message);
      }
    }
    
    // 7. Send error response
    res.status(500).json({
      success: false,
      message: "Text extract nahi ho saka",
      error: error.message,
      possibleIssues: [
        "Gemini API key check karo",
        "Gemini vision model (gemini-1.5-flash) available hai?",
        "Image size chota karo (max 4MB)",
        "Image format supported hai? (JPEG, PNG, WebP)"
      ]
    });
  }
};