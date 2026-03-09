import { Router } from "express";
import {getChat} from "../controllers/chatController.js"
import { verifyToken } from "../middlewares/jwtMiddleware.js";
const chatRouter = Router()

chatRouter.get("/get", verifyToken, getChat)

export default chatRouter;