import { providerEnum } from "../../common/enums/user.enums.js"
import * as DB_service from "../../DB/DB.service.js"
import userModel from "../../DB/model/user/user.model.js"
import { successResponse } from "../../common/utils/successMessage.js"
import { decrypt, encrypt } from "../../common/utils/security/encryption.js"
import { compareSync, hashSync } from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';
import { generateToken, verifyToken } from "../../common/utils/security/token.js"
import { OAuth2Client } from 'google-auth-library';
import { SALTROUNDS, SECRET_KEY } from "../../../config/config.env.js"
import messageModel from "../../DB/model/message/message.model.js"





export const signUpWithG = async (req, res, next) => {
    const { idToken } = req.body

    const client = new OAuth2Client();

    const ticket = await client.verifyIdToken({
        idToken,
        audience: "882940930891-civns95juvot511h26l0bv894o5ra5h9.apps.googleusercontent.com"
    });
    const payload = ticket.getPayload();

    const { email, email_verified, name } = payload

    let user = await DB_service.findOne({ model: userModel, filter: { email } })
    if (!user) {
        user = await DB_service.create({
            model: userModel, data: {
                email, confirmed: email_verified, userName: name,  provider: providerEnum.google
            }
        })
    }
    if (user.provider == providerEnum.system) {
        throw new Error("email already exist");
    }
    const access_token = generateToken({
        payload: { id: user._id, email: user.email }, secret_key: SECRET_KEY, options: {
            expiresIn: "30d",
            jwtid: uuidv4()
        }
    })
    return successResponse({ res: res, status: 200, message: "login successfully", data: { access_token } })
}

export const signUp = async (req, res, next) => {
    const {
        email,
        password,
        npassword,
        firstName,
        lastName,
        phone,
        age,
        gender
    } = req.body

    const checkUser = await DB_service.findOne({
        model: userModel,
        filter: { email }
    })

    if (checkUser) {
        throw new Error("account already exists")
    }

    if (password !== npassword) {
        throw new Error("password and confirmed password do not match")
    }

    const user = await DB_service.create({
        model: userModel,
        data: {
            email,
            password: hashSync(password, SALTROUNDS),
            firstName,
            lastName,
            phone: encrypt(phone),
            age,
            gender
        }
    })

    return successResponse({
        res,
        status: 201,
        message: "user created successfully",
        data: { user }
    })
}
export const signIn = async (req, res, next) => {
    const { email, password } = req.body

    const user = await DB_service.findOne({
        model: userModel,
        filter: { email }
    })

    if (!user) {
        throw new Error("this account does not exist, please sign up")
    }

    if (!compareSync(password, user.password)) {
        throw new Error("invalid email or password")
    }

    const token = generateToken({
        payload: {
            email: user.email,
            id: user._id
        },
        secret_key: SECRET_KEY,
        options: {
            expiresIn: "30d",
            jwtid: uuidv4()
        }
    })

    return successResponse({
        res,
        status: 200,
        message: "login successfully",
        data: { token }
    })
}
export const getProfile = async (req, res, next) => {
    return successResponse({res:res,status:200,data:{user:req.user}})
}

export const userMessages = async (req, res, next) => {
    const messages = await DB_service.find({
        model: messageModel,
        filter: {
            receiverId: req.user._id
        },
    })

    return res.status(200).json({
        message: "Messages retrieved successfully",
        messages
    })
}