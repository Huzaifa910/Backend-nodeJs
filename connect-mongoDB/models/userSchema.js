import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    email: String,
    passworl: String
})

let userModel = mongoose.model("user" , userSchema);

export default userModel