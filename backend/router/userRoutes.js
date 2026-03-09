import { Router } from "express";
import { getUser, logIn, setAvatar, signUp } from "../controllers/userCotroller.js";
import { verifyToken } from "../middlewares/jwtMiddleware.js";
import upload from "../middlewares/cloudinaryMiddleware.js";

const userRouter = Router()

userRouter.post("/login", logIn)
userRouter.post("/signup", signUp)
userRouter.get("/get",verifyToken, getUser)
userRouter.put("/avatar", verifyToken,upload.single("avatar"), setAvatar)

export default userRouter;