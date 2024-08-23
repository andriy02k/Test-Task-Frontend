import { configureStore } from "@reduxjs/toolkit";

const reducer = {
  //   chats: contactsReducer,
  //   filter: filterReducer,
};

export const store = configureStore({ reducer });
