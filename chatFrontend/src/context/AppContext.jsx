import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_SERVER_URL;
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currUser, setCurrUser] = useState([])
  const [allContacts, setAllContacts] = useState([])
      console.log("Curr user is , ", currUser)

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth");
      return;
    }
    const decoded = jwtDecode(token)
    setCurrUser(decoded)
    getAllData(token);
  }, []);

  const getAllData = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const usersResponse = await axios.get(
        `${url}/v1/api/user/get`,
        config
      );
      setUsers(usersResponse.data.user);
      console.log("All users",usersResponse.data)
    } catch (error) {
      console.log("User error:", error);
    }

    try {
      const contactResponse = await axios.get(
        `${url}/v1/api/contact/userContact`,
        config
      );
      setContacts(contactResponse.data.userContact);
      console.log("User contacs", contactResponse.data)
    } catch (error) {
      console.log("Contact error:", error);
    }

    try {
      const messageResponse = await axios.get(
        `${url}/v1/api/chat/get`,
        config
      );
      setMessages(messageResponse.data.chat);
      console.log("Messages", messageResponse.data)
    } catch (error) {
      console.log("Message error:", error);
    }
    try {
      const allContactResponse = await axios.get(`${url}/v1/api/contact/get`, config)
      console.log(`All contacts allContactResponse.data.contact`, allContactResponse.data.contact )
      setAllContacts(allContactResponse.data.contact)
    } catch (error) {
      console.log(error)
    }
  };


  
  return (
    <AppContext.Provider
      value={{
        count,
        setCount,
        messages,
        setMessages,
        contacts,
        setContacts,
        users,
        setUsers,
        currUser,
        allContacts,
        setAllContacts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};