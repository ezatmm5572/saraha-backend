import mongoose from "mongoose";
import { DB_URI } from "../../config/config.env.js";


const checkConnectionDB = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log("DB connected successfully")
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }

}

export default checkConnectionDB