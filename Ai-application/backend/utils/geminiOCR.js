// import fs from "fs";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const extractTextFromImage = async (imagePath) => {
//   console.log("OCR KEY:", process.env.GEMINI_API_KEY);

//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });

//   const imageBase64 = fs.readFileSync(imagePath, {
//     encoding: "base64",
//   });

//   const result = await model.generateContent([
//     {
//       inlineData: {
//         data: imageBase64,
//         mimeType: "image/jpeg",
//       },
//     },
//     "Extract all readable text from this image. Return plain text only.",

//   ]);

//   return result.response.text();
// };


// import fs from "fs";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const extractTextFromImage = async (imagePath) => {

//   console.log("OCR KEY:", process.env.GEMINI_API_KEY);

//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.0-pro-vision", // ✅ CORRECT MODEL
//   });

//   const imageBase64 = fs.readFileSync(imagePath, {
//     encoding: "base64",
//   });

//   const result = await model.generateContent({
//     contents: [
//       {
//         role: "user",
//         parts: [
//           { text: "Extract all readable text from this image. Return plain text only." },
//           {
//             inlineData: {
//               mimeType: "image/png", // 👈 tumhari file png hai
//               data: imageBase64,
//             },
//           },
//         ],
//       },
//     ],
//   });

//   return result.response.text();
// };



// import fs from "fs";
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// export const extractTextFromImage = async (imagePath) => {
//   const imageBase64 = fs.readFileSync(imagePath, {
//     encoding: "base64",
//   });

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash", 
//     contents: [
//       {
//         role: "user",
//         parts: [
//           {
//             text: "Extract all readable text from this image. Return plain text only.",
//           },
//           {
//             inlineData: {
//               mimeType: "image/png",
//               data: imageBase64,
//             },
//           },
//         ],
//       },
//     ],
//   });

//   return response.text;
// };



// utils/geminiOCR.js - COMPLETE NEW FILE
// import fs from "fs";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const extractTextFromImage = async (imagePath) => {
//   try {
//     // 1. Gemini initialize karo
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
//     // 2. Vision model use karo
//     const model = genAI.getGenerativeModel({ 
//       model: "gemini-1.5-flash"  // YEH MODEL MUST USE KARO
//     });
    
//     // 3. Image read karo
//     const imageBuffer = fs.readFileSync(imagePath);
//     const imageBase64 = imageBuffer.toString("base64");
    
//     // 4. Mime type detect karo
//     let mimeType = "image/jpeg";
//     if (imagePath.endsWith(".png")) mimeType = "image/png";
//     if (imagePath.endsWith(".webp")) mimeType = "image/webp";
    
//     // 5. Gemini ko call karo
//     const result = await model.generateContent([
//       "Extract all text from this image. Return only the extracted text, nothing else.",
//       {
//         inlineData: {
//           mimeType: mimeType,
//           data: imageBase64
//         }
//       }
//     ]);
    
//     // 6. Text return karo
//     return result.response.text();
    
//   } catch (error) {
//     console.error("OCR Error in extractTextFromImage:", error.message);
//     throw error;
//   }
// };


// utils/geminiOCR.js - YEH NAYA CODE COPY PASTE KARO
// import fs from "fs";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const extractTextFromImage = async (imagePath) => {
//   try {
//     console.log("Extracting text from:", imagePath);
    
//     // 1. Check if file exists
//     if (!fs.existsSync(imagePath)) {
//       throw new Error("Image file not found at path: " + imagePath);
//     }
    
//     // 2. Initialize Gemini
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
//     // 3. Use vision model (IMPORTANT)
//     const model = genAI.getGenerativeModel({ 
//       model: "gemini-1.5-flash" // YEH MUST HAI
//     });
    
//     // 4. Read image file
//     const imageBuffer = fs.readFileSync(imagePath);
//     const imageBase64 = imageBuffer.toString("base64");
    
//     // 5. Get mime type
//     let mimeType = "image/jpeg";
//     if (imagePath.toLowerCase().endsWith(".png")) {
//       mimeType = "image/png";
//     } else if (imagePath.toLowerCase().endsWith(".webp")) {
//       mimeType = "image/webp";
//     } else if (imagePath.toLowerCase().endsWith(".gif")) {
//       mimeType = "image/gif";
//     }
    
//     console.log("Image size:", imageBuffer.length, "bytes");
//     console.log("Mime type:", mimeType);
    
//     // 6. Call Gemini API
//     const result = await model.generateContent([
//       "Extract all text from this image accurately. Return only the extracted text without any explanation.",
//       {
//         inlineData: {
//           mimeType: mimeType,
//           data: imageBase64
//         }
//       }
//     ]);
    
//     const extractedText = result.response.text();
//     console.log("Extraction successful. Text length:", extractedText.length);
    
//     return extractedText;
    
//   } catch (error) {
//     console.error("Error in extractTextFromImage:", error.message);
//     console.error("Full error:", error);
//     throw error;
//   }
// };





// Updated extractTextFromImage with fallback
export const extractTextFromImage = async (imagePath) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Vision models to try in order
  const visionModels = [
    "gemini-1.5-pro",          // Try first
    "gemini-pro-vision",       // Try second  
    "gemini-1.0-pro-vision",   // Try third
    "gemini-1.5-flash"         // Try last
  ];
  
  const imageBuffer = fs.readFileSync(imagePath);
  const imageBase64 = imageBuffer.toString("base64");
  
  let mimeType = "image/jpeg";
  if (imagePath.toLowerCase().endsWith(".png")) mimeType = "image/png";
  
  for (const modelName of visionModels) {
    try {
      console.log(`Trying vision model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const result = await model.generateContent([
        "Extract text from image",
        {
          inlineData: {
            mimeType: mimeType,
            data: imageBase64
          }
        }
      ]);
      
      console.log(`✅ Success with: ${modelName}`);
      return result.response.text();
      
    } catch (error) {
      console.log(`❌ ${modelName} failed: ${error.message}`);
      continue;
    }
  }
  
  throw new Error("No vision model worked. Check available models.");
};