import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import profile from "../../assets/images/profile.png"
import { BsThreeDots } from "react-icons/bs";
import "./Inbox.css"
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import { FiPlusSquare } from "react-icons/fi";
import ConformBox from '../../components/conformBox/ConformBox';
import MessageRequest from '../../components/messageRequest/MessageRequest';
import RemoveContactBtn from '../../components/removeContactBtn/RemoveContactBtn';

const Inbox = () => {
  const [search, setSearch] = useState("")
  const { contacts, users, currUser } = useContext(AppContext)
  const navigate = useNavigate()
  const [options, setOptions] = useState(false)
  const [conform, setConform] = useState(false)
  const [selectedChat, setSelectedChat] = useState("")
  console.log("Curr user is ", currUser)

  const [showMessageRequest, setShowMessageRequest] = useState(false)

  const userContacts = users.filter((u) =>
    contacts.some((c) => u._id === c.contactUser)
  )

  const searchContact = userContacts.filter((u) =>
    search === "" ? true : u.name.toLowerCase().includes(search.toLowerCase())
  )

  const logoutHandler = () => {
    localStorage.removeItem("token")
    return window.location.href = "/"
  }


  return (
    <div className='inbox'>

      <div className="top">
        <div className="left">
          <p>Chat App</p>
          <input
            type="text"
            placeholder='Search here...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="right">
          <p onClick={() => setOptions(!options)}><SlOptionsVertical /></p>
          {options && (
            <div className="options">
              <p onClick={() => navigate(`/profile/${currUser.id}`)}>Profile</p>
              <p onClick={() => setConform(true)}>Logout</p>
            </div>
          )}
        </div>
      </div>
      <p onClick={() => setShowMessageRequest(!showMessageRequest)} style={{ textAlign: "right", width: "100%", padding: "5px 50px 0px 10px", cursor: "pointer", fontWeight: 'bold', marginTop:"100px" }}>Message requests</p>
      <div className="items" onClick={() => setShowMessageRequest(false)}>
        {searchContact.map((v) => (
          <div key={v._id} className='inbox-card'>
            <div onClick={() => navigate(`/chat/${v._id}`)} className="left">
              <img src={v.avatar || profile} alt="" />
              <p>{v.name}</p>
            </div>
            <p onClick={() => setSelectedChat(v._id)} style={{ cursor: "pointer", fontSize: "30px" }}>
              <BsThreeDots />
              {selectedChat === v._id && (
                <div className="chat-options">
                  <RemoveContactBtn id={v._id} text={"Delete"} />
                  <p onClick={() => navigate(`/chat/${v._id}`)} >Open chat</p>
                </div>
              )}
            </p>
          </div>
        ))}
      </div>


      <div className="add-contact">
        <p onClick={() => navigate("/contact")}><FiPlusSquare /></p>
      </div>
      {conform && (
        <ConformBox text={"Are you sure want to logout?"} conform={conform} setConform={setConform} fn={logoutHandler} />
      )}


      {showMessageRequest && (
        <>
        
          <MessageRequest setShow={setShowMessageRequest} />
        </>
      )}

    </div>
  )
}

export default Inbox
