import dotenv from "dotenv"
import connectDB from "./db/index.js"
import {app} from "./app.js"

dotenv.config({
    path:"./.env"
})

connectDB().then(()=>{
    console.log("connection success and running at port 3306")
    app.listen(8080,(err)=>{
        console.log("express listening on port 8080")
    })
})
