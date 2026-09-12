import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../../../config/config.env.js"
export const generateToken = ({payload,secret_key=SECRET_KEY,options={}})=>{
    return jwt.sign(payload,secret_key,options)
}

export const verifyToken = ({ token, secret_key,options }) => {
    return jwt.verify(token,secret_key,options)
}