import { decrypt } from "../utils/security/encryption.js";
import { SECRET_KEY } from "../../../config/config.env.js";
import { findOne } from "../../DB/DB.service.js";
import userModel from "../../DB/model/user/user.model.js";
import { verifyToken } from "../utils/security/token.js";

export const authontication =async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        throw new Error("invalid token");
    }
    const [ prefix, token ] = authorization.split(" ")
    if (!prefix || prefix !== "Bearer") {
        throw new Error("invalid token");
    }

    const decoded = verifyToken({ token, secret_key: SECRET_KEY })
    if (!decoded || !decoded?.id) {
        throw new Error("invalid token");
    }

    const user = await findOne({ model: userModel, filter: {_id:decoded.id}, select: "-password" })
    if (!user) {
        throw new Error("user not exist");
    }
    req.decoded = decoded
    if (user.phone) {
        user.phone = decrypt(user.phone)
    }
    req.user = user
    next()
}