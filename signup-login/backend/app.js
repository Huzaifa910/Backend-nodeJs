import express from "express";
import authRoute from "./routes/authRoutes.js";
import cors from "cors"
import chatbotRoute from "./routes/chatbotRoute.js";
import profileAuth from "./routes/profileRoute.js";

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use("/api" , );
app.use("/auth" , authRoute)
app.use("/api" , chatbotRoute)
app.use("/user" , profileAuth )

export default app;
