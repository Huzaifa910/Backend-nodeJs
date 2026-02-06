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



import fs from "fs";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const extractTextFromImage = async (imagePath) => {
  const imageBase64 = fs.readFileSync(imagePath, {
    encoding: "base64",
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // ✅ NOW IT WORKS
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "Extract all readable text from this image. Return plain text only.",
          },
          {
            inlineData: {
              mimeType: "image/png",
              data: imageBase64,
            },
          },
        ],
      },
    ],
  });

  return response.text;
};
