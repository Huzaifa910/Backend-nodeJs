import express from "express"
import { sendEmail,  } from "../controller/sendEmail.js";

const authRoute = express.Router()

authRoute.post("/sendemail" , sendEmail)

export default authRoute;