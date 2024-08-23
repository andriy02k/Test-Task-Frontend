import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChats, deleteChat } from "../api/chatApi.js";
import Modal from "./Modal.jsx";
import EditChatModal from "./EditChatModal.jsx";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [filter, setFilter] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatData = await getChats();
        setChats(chatData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, [refresh]);

  const removeContact = async (id) => {
    try {
      await deleteChat(id);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (chatId) => {
    setSelectedChatId(chatId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedChatId(null);
    setRefresh(!refresh);
  };

  const filterChats = () => {
    return chats.filter(
      (chat) =>
        chat.firstName.toLowerCase().includes(filter.toLowerCase()) ||
        chat.lastName.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredChats = filterChats();

  const handleChatClick = (chatId) => {
    console.log(chatId);
    navigate(`/chat/${chatId}`);
  };

  return (
    <>
      <input type="text" value={filter} onChange={handleFilterChange} />
      <ul>
        {filteredChats.map((chat) => (
          <li key={chat._id} onClick={() => handleChatClick(chat._id)}>
            {chat.firstName} {chat.lastName}
            {/* <div>{chat.messages[chat.messages.length - 1].text}</div> */}
            <button onClick={() => handleEditClick(chat._id)}>Edit</button>
            <button onClick={() => removeContact(chat._id)}>Delete</button>
          </li>
        ))}
        {showModal && (
          <Modal onClose={closeModal} showModal={showModal}>
            <EditChatModal chatId={selectedChatId} onClose={closeModal} />
          </Modal>
        )}
      </ul>
    </>
  );
};

export default ChatList;
