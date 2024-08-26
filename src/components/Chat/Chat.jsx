import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChatById, sendMessage } from "../../api/chatApi";
import css from "./Chat.module.css";
import userImage from "../../images/user.png";
import { Svg } from "../Icons/Icons";

const Chat = () => {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const chatData = await getChatById(id);
        setChat(chatData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChat();
    const interval = setInterval(fetchChat, 1000);

    return () => clearInterval(interval);
  }, [id]);

  const handleSendMessage = async () => {
    if (!newMessage) return;

    try {
      await sendMessage(id, {
        text: newMessage,
        sender: `${chat.firstName} ${chat.lastName}`,
      });

      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const getDate = (curentDate) => {
    const date = new Date(curentDate);

    const formattedDate = `${date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })} ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;

    return formattedDate;
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  if (!chat) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className={css.container}>
        <img
          className={css.img}
          src={userImage}
          alt="user"
          width={32}
          height={32}
        />
        <h1 className={css.name}>
          {chat.firstName} {chat.lastName}
        </h1>
      </div>
      {chat.messages && chat.messages.length > 0 ? (
        chat.messages.map(({ _id, text, createdAt, sender }) => (
          <div
            key={_id}
            className={
              sender === "Auto-response" ? css.autoMessage : css.myMessage
            }
          >
            <p className={css.text}>{text}</p>
            <p className={css.date}>{getDate(createdAt)}</p>
          </div>
        ))
      ) : (
        <p>Start chat</p>
      )}
      <div className={css.inputCon}>
        <input
          className={css.input}
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type your message"
        />
        <button className={css.button} onClick={handleSendMessage}>
          <Svg id={"#icon-rocket"} width={12} height={12} />
        </button>
      </div>
    </>
  );
};

export default Chat;
