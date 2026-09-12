import messageModel from "../../DB/model/message/message.model.js"
import { analyzeMessages } from "./ai.service.js"

export const messageInsights = async (req, res, next) => {

    const messages = await messageModel.find({
        receiverId: req.user._id
    })

    if (!messages.length) {
        throw new Error("You don't have any messages to analyze")
    }

    const analysis = await analyzeMessages(messages)

    return res.status(200).json({
        message: "Messages analyzed successfully",
        data: {
            analysis
        }
    })
}