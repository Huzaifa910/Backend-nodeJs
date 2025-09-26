import express, { request } from "express"

let app = express();

app.get("/" , (request , response)=>{
    console.log(request.url)
    response.send("Server is running")
})
app.get("/about" , (request , response)=>{
    console.log(request.url)
    response.send("About page")

})

app.listen(5000 , ()=>console.log("Server Running" ));