import { Router } from "express";
import { addMessage } from "./message.service.js";
const messageRouter = Router()
messageRouter.post("/message/:userID",addMessage)


export default messageRouter