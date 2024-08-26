import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChats, deleteChat } from "../../api/chatApi.js";
import Modal from "../Modal/Modal.jsx";
import EditChatModal from "../EditChatModal/EditChatModal.jsx";
import AddModal from "../AddModal/AddModal.jsx";
import css from "./ChatList.module.css";
import userImage from "../../images/user.png";
import { Svg } from "../Icons/Icons.jsx";

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
    <div className={css.container}>
      <div className={css.topContainer}>
        <div className={css.buttonContainer}>
          <img
            className={css.img}
            src={userImage}
            alt="user"
            width={32}
            height={32}
          />
          <button className={css.button} onClick={() => setAddModal(!addModal)}>
            <Svg id={"#icon-plus"} width={12} height={12} />
            Create new chat
          </button>
        </div>
        {addModal && (
          <Modal onClose={closeModal} addModal={addModal}>
            <AddModal />
          </Modal>
        )}
        <input
          className={css.input}
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search on start new chat..."
        />
      </div>
      <h2 className={css.title}>Chats</h2>
      <ul className={css.list}>
        {filteredChats.map(({ firstName, lastName, _id, messages }) => (
          <li
            className={css.item}
            key={_id}
            onClick={() => handleChatClick(_id)}
          >
            <div className={css.imgContainer}>
              <img
                className={css.img}
                src={userImage}
                alt="user"
                width={32}
                height={32}
              />
              <div className={css.nameContainer}>
                <p className={css.name}>
                  {firstName} {lastName}
                </p>
                <p className={css.message}>{getLastMessage(messages).text}</p>
              </div>
            </div>
            <div className={css.dateContainer}>
              <p className={css.date}>
                {getDate(getLastMessage(messages).createdAt)}
              </p>
              <div className={css.buttonContainer}>
                <button
                  className={css.edit}
                  onClick={() => handleEditClick(_id)}
                >
                  <Svg id={"#icon-pencil"} width={12} height={12} />
                </button>
                <button
                  className={css.delete}
                  onClick={() => removeContact(_id)}
                >
                  <Svg id={"#icon-bin2"} width={12} height={12} />
                </button>
              </div>
            </div>
          </li>
        ))}
        {showModal && (
          <Modal onClose={closeModal} showModal={showModal}>
            <EditChatModal chatId={selectedChatId} />
          </Modal>
        )}
      </ul>
    </div>
  );
};

export default ChatList;
