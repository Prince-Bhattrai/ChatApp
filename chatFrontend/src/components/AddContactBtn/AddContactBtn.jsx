import axios from 'axios';
import React, { useContext } from 'react';
import { FaPlus } from "react-icons/fa6";
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const AddContactBtn = ({ id }) => {
  const { setContacts } = useContext(AppContext);

  const addContact = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/v1/api/contact/add/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setContacts((prev) => [response.data.newContact, ...prev]);
        toast.success(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <p
      onClick={addContact}
      style={{ cursor: "pointer", fontSize: "25px" }}
    >
      <FaPlus />
    </p>
  );
};

export default AddContactBtn;