import express from "express"
import { getUserProfile, updateUserProfile } from "../controllers/profileController.js"
import { protect } from "../middleware/authMiddleware.js"

const profileAuth = express.Router()

profileAuth.get("/profile" , protect , getUserProfile )
profileAuth.put("/update-profile" , protect , updateUserProfile )

export default profileAuth

