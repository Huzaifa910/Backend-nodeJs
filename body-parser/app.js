import express, { response } from "express"
import fs from "fs"

let app = express();
let PORT = process.env.PORT || "5000"

// body parser
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.post("/createuser" , ( request , response)=>{
    let userExist = fs.existsSync("user.txt")
    let body = {...request.body}

    if (userExist) {
        // second user
        let userData = JSON.parse(fs.readFileSync("user.txt" , "utf-8"));
        userData.push(body);
        console.log("Second User" ,userData);
        
        fs.writeFileSync("user.txt" , JSON.stringify(userData))
        response.json({
            message: "User Created"
        })

    } else {
        let arr = []
        arr.push(body)
        fs.writeFileSync("user.txt" , JSON.stringify(arr))
        response.json({
            message: "User Created..."
        })
    }

});

app.listen(PORT , ()=>console.log(`Local host server is up from Port ${PORT}` ))