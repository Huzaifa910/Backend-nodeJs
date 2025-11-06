import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((res) => console.log("Mongodb Connected Successfully"))
    .catch((error) => console.log("Mongodb error!", error.message));
};
