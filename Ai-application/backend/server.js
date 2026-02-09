import dotenv from "dotenv"
import app from "./app.js"
import { dbConnect } from "./config/mongodb.js";

dotenv.config()
dbConnect()

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT} `));
