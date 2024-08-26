import React, { useState } from "react";
import { updateChat } from "../../api/chatApi";
import css from "./EditChatModal.module.css";

const EditChatModal = ({ chatId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateChat(chatId, { firstName, lastName });
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>Edit user data</label>
      <input
        className={css.input}
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        className={css.input}
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <button className={css.button} type="submit">
        Send
      </button>
    </form>
  );
};

export default EditChatModal;
