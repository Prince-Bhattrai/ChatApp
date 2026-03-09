import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        })
    }
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User already exist!"
            })
        }
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password, salt)
        const newUser = new User({
            name, email, password: hash
        })
        await newUser.save()
        res.status(201).json({
            success: true,
            message: "User created!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error please try again later!"
        })

    }
}


export const logIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!"
        })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password!"
            })
        }
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "5d" })
        res.status(200).json({
            success: true,
            message: "Log in successful!",
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error please try again later!"
        })

    }
}


export const setAvatar = async (req, res) => {
    const userId = req.user.id;

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Avatar file is required!"
        });
    }

    const avatar = req.file.path; 
    const name = req.body.name;   

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Name is required!"
        });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatar, name },
            { new: true, select: "-password" } 
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, please try again later!"
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json({
            success: true,
            message: "All user",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error please try again later!"
        })
    }
}