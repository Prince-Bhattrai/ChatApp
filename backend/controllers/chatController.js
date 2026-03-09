import { Chat } from "../models/chatModel.js";




export const getChat = async (req, res) => {
    try {
        const chat = await Chat.find()
        res.status(200).json({
            success: true,
            message: "All chat!",
            chat
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error please try again later!"
        })
    }
}