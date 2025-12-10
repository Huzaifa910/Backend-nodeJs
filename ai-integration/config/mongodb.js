import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((res) => console.log("mongodb is connected successfully"))
    .catch((error) => console.log("mongodb error", error.message));
};
