import { Router } from "express"
import { messageInsights } from "./ai.controller.js"
import { authontication } from "../../common/middlware/authontication.js"

const aiRouter = Router()

aiRouter.get(
    "/message-insights",
    authontication,
    messageInsights
)

export default aiRouter