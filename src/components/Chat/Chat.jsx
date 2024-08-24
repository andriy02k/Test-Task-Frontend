import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChatById, sendMessage } from "../../api/chatApi";

const Chat = () => {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  // const [refresh, setRefresh] = useState(false);

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
    const interval = setInterval(fetchChat, 1000); // Полінг кожні 5 секунд

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
      // setRefresh(!refresh);
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
      <div>
        <h1>
          {chat.firstName} {chat.lastName}
        </h1>
        {chat.messages && chat.messages.length > 0 ? (
          chat.messages.map(({ _id, text, createdAt }) => (
            <p key={_id}>
              {text} <br />
              {getDate(createdAt)}
            </p>
          ))
        ) : (
          <p>Start chat</p>
        )}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </>
  );
};

export default Chat;
