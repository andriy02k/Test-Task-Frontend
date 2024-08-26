import React, { useState } from "react";
import { createChat } from "../../api/chatApi";
import css from "./AddModal.module.css";

const EditChatModal = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log({ firstName, lastName });
      await createChat({ firstName, lastName });
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>Add a new user</label>
      <input
        className={css.input}
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        className={css.input}
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <button className={css.button} type="submit">
        Send
      </button>
    </form>
  );
};

export default EditChatModal;
