import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import "./MessageRequest.css"
import profile from "../../assets/images/profile.png"
import AddContactBtn from '../AddContactBtn/AddContactBtn'
import { FiMessageCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'


const MessageRequest = ({ setShow }) => {
    const navigate = useNavigate()
    const { contacts, currUser, allContacts, users, setUsers } = useContext(AppContext)

    const messageRequests = allContacts.filter((c) =>
        c.contactUser === currUser.id &&
        !contacts.some((my) => my.contactUser === c.user)
    )

    console.log(messageRequests)

    const requestUser = users.filter((u) =>
        messageRequests.some((m) => String(u._id) === String(m.user))
    )

    return (
        <div className='message-request'>
            <div className="topp">
                <p>Message requests</p>
                <p onClick={() => setShow(false)}>X</p>
            </div>
            <hr style={{marginTop:"20px", opacity:"50%"}}/>

            <div className={messageRequests.length === 0 ? "empty" : "requests"}>

                {messageRequests.length === 0 && (
                    <h3>No any requests</h3>
                )}


                {requestUser.map((user) => (
                    <div className='req-user'>
                        <div className="left">
                            <img src={user.avatar || profile} alt="" />
                            <p>{user.name}</p>
                        </div>
                        <div className="right">
                            <AddContactBtn id={user._id} />
                            <p onClick={()=>navigate(`/chat/${user._id}`)} style={{fontSize:"25px", cursor:"pointer"}}><FiMessageCircle /></p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default MessageRequest