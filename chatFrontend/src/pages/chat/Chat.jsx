import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import profile from "../../assets/images/profile.png";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import "./Chat.css";
import { io } from "socket.io-client";

const socket = io("https://chat-app-backend-f2im.onrender.com");
const Chat = () => {
    const { id } = useParams();
    const { messages, setMessages, currUser, users } = useContext(AppContext);
    const [input, setInput] = useState("");
    const bottomRef = useRef(null); 

    const selectedUser = users.find((u) => u._id === id);

    const thisChatMessage = messages.filter(
        (m) =>
            (m.from === currUser?.id && m.to === id) ||
            (m.from === id && m.to === currUser?.id)
    );

    useEffect(() => {
        socket.on("to", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("to");
        };
    }, [setMessages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [thisChatMessage]);

    const sendMessage = () => {
        if (!input.trim()) return;

        socket.emit("from", {
            from: currUser.id,
            to: id,
            message: input,
        });

        setInput("");
    };

    const navigate = useNavigate()

    const formatTime = (date) => {
        if (!date) return "";

        const msgDate = new Date(date);
        const now = new Date();

        const isToday =
            msgDate.toDateString() === now.toDateString();

        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);

        const isYesterday =
            msgDate.toDateString() === yesterday.toDateString();

        if (isToday) {
            return msgDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
        }

        if (isYesterday) {
            return "Yesterday";
        }

        return msgDate.toLocaleDateString();
    };

    return (
        <div className='chat'>
            <div className="top">
                <div className="left">
                    <img src={selectedUser?.avatar || profile} alt="" />
                    <p>{selectedUser?.name}</p>
                </div>
                <p onClick={()=>navigate(`/profile/${id}`)} style={{ fontSize: "30px", cursor: "pointer" }}>
                    <IoMdInformationCircleOutline />
                </p>
            </div>

            <div className="center-box">
                {thisChatMessage.length === 0 && (
                    <h1 style={{ textAlign: 'center', marginTop: "40px" }}>
                        No message found!
                    </h1>
                )}

                {thisChatMessage.map((m, i) => (
                    <div key={i} className={m.from === currUser.id ? "msg sent" : "msg received"}>
                        <p>{m.message}</p>
                        <p className="time">
                            {m.createdAt ? formatTime(m.createdAt) : formatTime(Date.now())}
                        </p>
                    </div>
                ))}

                <div ref={bottomRef}></div>
            </div>

            <div className="bottom">
                <div className="box">
                    <input
                        placeholder='Type here...'
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <p
                        onClick={sendMessage}
                        style={{ fontSize: "25px", cursor: "pointer" }}
                    >
                        <RiSendPlaneFill />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Chat;
