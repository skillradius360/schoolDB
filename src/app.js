import express from "express"
import cors from "cors"

export const app= express();

app.use(express.json({
    limit:"16kb"
}))
app.use(cors({
    origin:[process.env.DEST]
}))

app.use(express.urlencoded({
    extended:true
}))


// ******************************************