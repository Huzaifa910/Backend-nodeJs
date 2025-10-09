import express from "express"
import mongoose from "mongoose"
import userModel from "./models/userSchema.js"

let app = express()
let PORT = process.env.PORT || 5005

// connect Mongo DB
let URI = "mongodb+srv://admin:Admin321@cluster0.pbdevl9.mongodb.net/tododata?retryWrites=true&w=majority&appName=Cluster0"
mongoose
.connect(URI)
.then((res)=>console.log("Mongo DB connected..."))
.catch((err)=>console.log("Mongo DB error " , err.message))

// body parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create user 
app.post("/createuser" , async(request , response)=>{

try {
    let body = request.body
    console.log("Body" , body)
    await userModel.create(body)    
    
} catch (error) {
    response.json({
        message: error.message
    })
}
})

app.listen( PORT , ()=>console.log(`Server is running from port ${PORT}` ))