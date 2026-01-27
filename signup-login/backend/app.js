import express from "express";
import authRoute from "./routes/authRoutes.js";
import cors from "cors"

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use("/api" , );
app.use("/auth" , authRoute)

export default app;
