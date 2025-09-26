import http from 'http'

let server = http.createServer((request , response)=>{
    console.log("request" , request.url)
    if(request.url === "/"){
        response.end("Home")
    }
    else if (request.url === "/about"){
        response.end("About")
    }
    else if (request.url === "/contact"){
        response.end('Contact')
    }
});

server.listen(5005 , ()=>console.log("server Running"));