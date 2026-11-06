import express from "express"
import todoRouter from "./routes/routes.js"
import cors from "cors"


const app = express()

const PORT = 6565

app.use(cors())
app.use(express.json())

app.use("/api",todoRouter)


app.listen(PORT,() => {
    console.log("sever ishlayabdi shekili ... ")
})



