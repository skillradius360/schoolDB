import express from "express"
import cors from "cors"

export const app= express();

app.use(express.json({
    limit:"16kb"
}))
// app.use(cors({
//     origin:[process.env.DEST]
// }))

app.use(express.urlencoded({
    extended:true
}))



const allowedOrigins = ["http://localhost:8000", "https://yourfrontend.com"];
app.use(
  cors({
    origin: allowedOrigins, 
    methods: ["GET", "POST"], 
    credentials: true, 
  })
);


// ******************************************

import { schoolRouter } from "./routes/school.routes.js";
app.use("/school",schoolRouter)