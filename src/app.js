import express from "express"
import cors from "cors"

import userRouter from "./modules/user/user.controller.js"
import messageRouter from "./modules/message/message.controller.js"
import aiRouter from "./modules/ai/ai.router.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Saraha App"
    })
})

app.use("/user", userRouter)
app.use("/messages", messageRouter)
app.use("/ai", aiRouter)

app.use((req, res) => {
    res.status(404).json({
        message: `URL: ${req.originalUrl} not found`
    })
})

app.use((err, req, res, next) => {
    console.error(err)

    res.status(err.statusCode || 500).json({
        error: err.message
    })
})

export default app