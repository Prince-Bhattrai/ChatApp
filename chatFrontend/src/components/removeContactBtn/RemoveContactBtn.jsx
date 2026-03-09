import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../../context/AppContext'
import ConformBox from '../conformBox/ConformBox'

const RemoveContactBtn = ({ id, text }) => {

    const { contacts, setContacts } = useContext(AppContext)

    const [conform, setConform] = useState(false)

    const deleteContactHandler = async () => {

        if (!id) return toast.error("Provide required data!")

        const token = localStorage.getItem("token")

        if (!token) {
            toast.error("No user session!")
            return window.location.href = "/auth"
        }

        const deleteId = contacts.find((c) => String(c.contactUser) === String(id))

        if (!deleteId) {
            return toast.error("Contact not found")
        }

        try {

            const response = await axios.delete(
                `${import.meta.env.VITE_SERVER_URL}/v1/api/contact/delete/${deleteId._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.data.success) {

                toast.success(response.data.message)

                setContacts(prev =>
                    prev.filter((c) => c._id !== response.data.deletedData._id)
                )

                setConform(false)
            }

        } catch (error) {

            console.log(error.response)

            toast.error(
                error.response?.data?.message || "Something went wrong"
            )
        }
    }

    return (
        <>
            <p onClick={() => setConform(true)}>
                {text}
            </p>

            {conform && (
                <ConformBox
                    conform={conform}
                    setConform={setConform}
                    fn={deleteContactHandler}
                    text={"Are you sure want to delete this?"}
                />
            )}
        </>
    )
}

export default RemoveContactBtn