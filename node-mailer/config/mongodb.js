import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((res) => console.log("MongoDB connected Successfully"))
    .catch((error) => console.log("MongoDB error!", error.message));
};
