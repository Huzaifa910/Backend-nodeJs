import express from "express";
import { testController } from "../controllers/testController.js";
import { loginController, signupController } from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const authRoute = express.Router()

// authRoute.post("/test" , testController)
authRoute.post("/signup" , signupController)
authRoute.post("/login" , loginController)
authRoute.get('/profile', protect, testController);

export default authRoute