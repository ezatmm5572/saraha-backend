import app from "../src/app.js"
import checkConnectionDB from "../src/DB/connectionDB.js"

const handler = async (req, res) => {
    await checkConnectionDB()
    return app(req, res)
}

export default handler