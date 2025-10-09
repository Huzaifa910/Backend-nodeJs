import mongoose from "mongoose";

let todoSchema = new mongoose.Schema({
    title: String,
    description: String ,
    isComplete: Boolean

})

let todoModel = mongoose.model("todos" , todoSchema);

export default todoModel