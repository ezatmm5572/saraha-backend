import mongoose from "mongoose"

const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },

        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        }
    },
    {
        timestamps: true
    }
)

const messageModel = mongoose.models.messageModel || mongoose.model("Message", messageSchema)
export default messageModel