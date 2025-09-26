import express from "express"
import { product } from "./product.js"

let PORT = "5005"
let app = express()

app.get("/", (request, response) => {
    response.send("server Running")
})

app.get("/about", (req, res) => {
    res.send("About Page")
})

// All Product Calling
app.get("/product", (req, res) => {
    console.log("Request", req.url)
    res.send(product)
})

// Single product calling (query param)
app.get("/product/:id", (req, res) => {
    console.log("Request single product API ", req.url)
    console.log(req.params.id)

    let findProduct = product.find((obj) => {
        if (obj.id == req.params.id) {
            return obj
        }
    })
    console.log("findProduct" , findProduct)

    if(findProduct){
        res.send(findProduct)
    }else{
        res.send("Product not found")
    }
})

app.listen(PORT, () => console.log(`Server Running from ${PORT}`));