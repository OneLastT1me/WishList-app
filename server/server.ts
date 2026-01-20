import express from "express"
import cors from "cors"
import  parseLink from "./parseLink.js"

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/parse-link", parseLink)

app.listen(3001, ()=>{
    console.log("Server running on http://localhost:3001")
})

