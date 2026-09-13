import { PORT } from "../config/config.env.js"
import checkConnectionDB from "./DB/connectionDB.js"
import app from "./app.js"

const bootstrap = async () => {

    await checkConnectionDB()

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

export default bootstrap