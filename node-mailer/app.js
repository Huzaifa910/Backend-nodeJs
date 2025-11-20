import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/mongodb.js";
import authRoute from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use("/api", authRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Server Running",
  });
});

app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));
