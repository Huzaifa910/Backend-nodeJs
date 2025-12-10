import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/mongodb.js";
import authRoute from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect;

app.use("/api" , authRoute )

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
