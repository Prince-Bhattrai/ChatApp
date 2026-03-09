import { Contact } from "../models/userContactModel.js";

export const addContact = async (req, res) => {
    const user = req.user.id;
    const {contactUser} = req.params;
    console.log("requested user is, ", user)
    if (!user || !contactUser) {
        return res.status(400).json({
            success: false,
            message: "Please provide required data!"
        })
    }
    try {
        const isAlreadyExist = await Contact.findOne({ contactUser, user })
        if (isAlreadyExist) {
            return res.status(401).json({
                success: false,
                message: "Contact alredy exist!"
            })
        }
        const newContact = new Contact({
            contactUser,
            user
        })

        await newContact.save()
        res.status(201).json({
            success: true,
            message: "Contact added successfully",
            newContact
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error please try again later!"
        })
    }
}
export const deleteContact = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Please provide required data!"
        });
    }

    try {

        const deletedData = await Contact.findOneAndDelete({_id:id});

        if (!deletedData) {
            return res.status(404).json({
                success: false,
                message: "Contact not found or unauthorized!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact deleted successfully!",
            deletedData
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error please try again later!"
        });
    }
};


export const getContact = async (req, res) => {
    try {
        const contact = await Contact.find({})
        res.status(200).json({
            success: true,
            message: "All contact!",
            contact
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error please try again later!"
        })
    }
}


export const getUserContact = async(req, res) => {
    const user = req.user.id;
    try {
        const userContact = await Contact.find({user})
        res.status(200).json({
            success:true,
            message:"User contacts",
            userContact
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Server error please try again later."
        })
    }
}