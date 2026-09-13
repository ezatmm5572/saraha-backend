import mongoose from "mongoose"
import { DB_URI } from "../../config/config.env.js"

let isConnected = false

const checkConnectionDB = async () => {
    if (isConnected) {
        return
    }

    try {
        const db = await mongoose.connect(DB_URI)

        isConnected = db.connections[0].readyState === 1

        console.log("DB connected successfully")
    } catch (error) {
        console.error("Database connection failed:", error.message)
        throw error
    }
}

export default checkConnectionDB