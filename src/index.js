import dotenv from "dotenv"
import {initializeDatabase} from "./db/index.js"
import {app} from "./app.js"

dotenv.config({
    path:"./.env"
})

initializeDatabase().then(()=>{
    console.log("connection success and running at port 3306")
    app.listen(process.env.PORT8000,(err)=>{
        console.log("express listening on port 8000")
    })
})
