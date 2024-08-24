import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChats, deleteChat } from "../../api/chatApi.js";
import Modal from "../Modal/Modal.jsx";
import EditChatModal from "../EditChatModal/EditChatModal.jsx";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [filter, setFilter] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [addModal, setAddModal] = useState(false);
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
    setAddModal(false);
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

  const getLastMessage = (messages) => {
    if (!messages || messages.length === 0) return " ";
    return messages[messages.length - 1];
  };

  const getDate = (curentDate) => {
    const date = new Date(curentDate);

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  };

  const handleChatClick = (chatId) => {
    console.log(chatId);
    navigate(`/chat/${chatId}`);
  };

  return (
    <>
      <input type="text" value={filter} onChange={handleFilterChange} />
      <button onClick={() => setAddModal(!addModal)}>Create new chat</button>
      {addModal && (
        <Modal onClose={closeModal} addModal={addModal}>
          <EditChatModal />
        </Modal>
      )}
      <ul>
        {filteredChats.map(({ firstName, lastName, _id, messages }) => (
          <li key={_id} onClick={() => handleChatClick(_id)}>
            {firstName} {lastName}
            <p>{getLastMessage(messages).text}</p>
            <p>{getDate(getLastMessage(messages).createdAt)}</p>
            <button onClick={() => handleEditClick(_id)}>Edit</button>
            <button onClick={() => removeContact(_id)}>Delete</button>
          </li>
        ))}
        {showModal && (
          <Modal onClose={closeModal} showModal={showModal}>
            <EditChatModal chatId={selectedChatId} />
          </Modal>
        )}
      </ul>
    </>
  );
};

export default ChatList;
