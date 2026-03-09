import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import profile from "../../assets/images/profile.png";
import "./AddContact.css";
import AddContactBtn from '../../components/AddContactBtn/AddContactBtn';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {

  const navigate = useNavigate()
  const { users, contacts } = useContext(AppContext);
  const [search, setSearch] = useState("")
  const notContacts = users.filter((u) =>
    !contacts.some((c) => c.contactUser === u._id)
  );

  const searchContact = notContacts.filter((n) =>
    search === "" ? true : n.name.toLowerCase().includes(search.toLowerCase()))



  return (

    <div className='add-contact'>
      <div className="top">
        <p>Chat App</p>
        <input
          type="text"
          placeholder='Search here...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>
      {searchContact.length !== 0 && (
        <>
          {searchContact.map((user) => (
            <div key={user._id} className='contact-card'>
              <div className="left" onClick={()=>navigate(`/profile/${user._id}`)}>
                <img src={user.avatar || profile} alt="profile" />
                <p>{user.name}</p>
              </div>
              <AddContactBtn id={user._id} />
            </div>
          ))}
        </>
      )}

      {searchContact.length === 0 &&(
        <h1 style={{marginTop:"40px"}}>No user found!</h1>
      )}

    </div>
  );
};

export default AddContact;