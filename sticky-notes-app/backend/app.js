import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/mongodb.js";
import authRoute from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// bodyParsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongodb connection
dbConnect();

// All routes
app.use("/api", authRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Server Running",
  });
});



app.listen(PORT, () => console.log(`PORT is running on localhost:${PORT}`));
