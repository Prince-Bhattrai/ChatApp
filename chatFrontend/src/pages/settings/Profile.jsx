import React, { useContext, useState, useEffect } from 'react'
import "./Profile.css"
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import profile from "../../assets/images/profile.png"
import { IoIosShareAlt } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { toast } from 'react-toastify'
import { HiOutlineUpload } from "react-icons/hi";
import axios from 'axios'
import AddContactBtn from '../../components/AddContactBtn/AddContactBtn'

const Profile = () => {

  const { id } = useParams()
  const { users, setUsers, currUser } = useContext(AppContext)

  const thisUser = users.find(u => u._id === id)

  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [editBox, setEditBox] = useState(false)

  useEffect(() => {
    if (thisUser) {
      setName(thisUser.name || "")
      setAvatar(thisUser.avatar || null)
    }
  }, [thisUser])

  const copyHandler = async (text) => {
    await navigator.clipboard.writeText(text)
    toast.success("Profile copied!")
  }

  const updateHandler = async () => {
    if (!name) {
      return toast.error("Name is required!")
    }

    const token = localStorage.getItem("token")
    if (!token) return toast.error("Unauthorized")

    try {
      const formData = new FormData()
      formData.append("name", name)

      if (avatar instanceof File) {
        formData.append("avatar", avatar)
      }

      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/v1/api/user/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      toast.success(response.data.message || "Profile updated!")

      if (response.data.user) {
        setAvatar(response.data.user.avatar)
        setName(response.data.user.name)

        const updatedUsers = users.map(u =>
          u._id === id ? { ...u, name: response.data.user.name, avatar: response.data.user.avatar } : u
        )
        setUsers(updatedUsers)
      }

      setEditBox(false)

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  if (!thisUser) return null

  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
    }
  }

  const avatarSrc =
    avatar instanceof File
      ? URL.createObjectURL(avatar)
      : avatar || profile

  return (
    <>
      <div className='profile'>
        <div className="top">
          <img src={avatarSrc} alt="" />

          <div className="right">
            <p>{name}</p> 
            <p>{new Date(thisUser.createdAt).toDateString()}</p>
          </div>
        </div>

        <div className="center">
          {currUser.id === id && (
            <>
              <button onClick={() => setEditBox(!editBox)}>Edit</button>
              <p><IoSettingsOutline /></p>
            </>
          )}

          <p onClick={() => copyHandler(`http://localhost:5173/${thisUser._id}`)}>
            <IoIosShareAlt />
          </p>
          {currUser.id !==id &&(
            <>
            <AddContactBtn id={id}/>
            </>
          )}
        </div>
      </div>

      {editBox && (
        <div className="edit-box">
          <fieldset>
            <label htmlFor="name">Edit name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="avatar">
              <p><HiOutlineUpload /></p>
            </label>

            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleAvatar}
              id="avatar"
            />
          </fieldset>

          <button onClick={updateHandler}>Submit</button>
        </div>
      )}
    </>
  )
}

export default Profile