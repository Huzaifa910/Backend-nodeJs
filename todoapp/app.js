import express, { json, response } from "express";
import mongoose from "mongoose";
import todoModel from "./models/todoSchema.js";
// import { v4 as uuidv4 } from "uuid";
import cors from "cors"

let app = express()
let PORT = process.env.PORT || 5005

app.use(cors())

// connect Mongo DB
let URI = "mongodb+srv://testUser:test321@cluster0.pbdevl9.mongodb.net/tododata?retryWrites=true&w=majority&appName=Cluster0"
mongoose
.connect(URI)
.then((res)=>console.log("Mongo DB connected..."))
.catch((err)=>console.log("Mongo DB error " , err.message))

// body parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create user 
app.post("/createtodo" , async(request , response)=>{

try {
    let body = request.body 
    console.log("Body" , body)
    await todoModel.create(body)    

    response.json({
        message: "Todo Created Successfully",
        data : body
    })
    
} catch (error) {
    response.json({
        message: error.message
    })
}
})



app.get("/gettodo" , async (request , response)=>{

    try {
        let todos = await todoModel.find()
        response.json({
            message: "All todos..",
            data : todos
        })
    } catch (error) {
        response.json({
            message: error.message
        })
    }
} )


app.put("/updatetodo/:id" , async (request , response) => {
    try {
        let id = request.params.id
        let body = request.body

        let updatedTodo = await todoModel.findOneAndUpdate({_id:id} , body , {new: true })

        response.json({
            message: "Todo Updated" ,
            data: updatedTodo
        })

    } catch (error) {
        response.json({
            message: "Error From Update todo",
            error: error.message
        })
    }
})


app.delete("/deletetodo/:id" , async (request , response) => {
    try {
        let id = request.params.id
        await todoModel.findOneAndDelete({_id:id})

        response.json({
            message: "Todo Deleted Successfully"
        })
    } catch (error) {
        response.json({
            message: "Error from delete todo",
            error: error.message
        })
    }
})


app.listen( PORT , ()=>console.log(`Server is running from port ${PORT}` ))