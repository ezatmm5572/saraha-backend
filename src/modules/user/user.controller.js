import { Router } from "express";
import * as US from "./user.service.js"
import { authontication } from "../../common/middlware/authontication.js";
import { authorization } from "../../common/middlware/authorization.js";
import { userRole } from "../../common/enums/user.enums.js";
const userRouter = Router()


userRouter.post("/signUp/gmail", US.signUpWithG)
userRouter.post("/signUp", US.signUp)
userRouter.post("/signIn", US.signIn)
userRouter.get("/profile", authontication, authorization([userRole.user]), US.getProfile)
userRouter.get("/messages", authontication, authorization([userRole.user]), US.userMessages)
export default userRouter