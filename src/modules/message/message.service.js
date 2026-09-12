import { create, findOne } from "../../DB/DB.service.js"
import userModel from "../../DB/model/user/user.model.js"
import messageModel from "../../DB/model/message/message.model.js"
import { successResponse } from "../../common/utils/successMessage.js"

export const addMessage = async (req, res, next) => {
    const { content } = req.body
    const { userID } = req.params

    if (!content) {
        throw new Error("please enter your message")
    }

    const user = await findOne({
        model: userModel,
        filter: {
            _id: userID
        }
    })

    if (!user) {
        throw new Error("this user does not exist")
    }

    const message = await create({
        model: messageModel,
        data: {
            content,
            receiverId: userID
        }
    })

    return successResponse({
        res,
        status: 201,
        message: "message sent successfully",
        data: {
            message
        }
    })
}