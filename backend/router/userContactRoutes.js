import { Router } from "express";
import {verifyToken} from "../middlewares/jwtMiddleware.js"
import { addContact, deleteContact, getContact, getUserContact } from "../controllers/userContactController.js";

const userContactRouter = Router()

userContactRouter.post("/add/:contactUser",verifyToken, addContact )
userContactRouter.delete("/delete/:id", verifyToken, deleteContact)
userContactRouter.get("/get", verifyToken , getContact)
userContactRouter.get("/userContact", verifyToken,  getUserContact)

export default userContactRouter