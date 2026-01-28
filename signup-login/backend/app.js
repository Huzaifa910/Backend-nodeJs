import express from "express";
import authRoute from "./routes/authRoutes.js";
import cors from "cors"
import chatbotRoute from "./routes/chatbotRoute.js";

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use("/api" , );
app.use("/auth" , authRoute)
app.use("/api" , chatbotRoute)

export default app;
