import { createSlice } from "@reduxjs/toolkit";
import {
  getChatsThunk,
  createChatThunk,
  updateChatThunk,
  deleteChatThunk,
  sendMessageThunk,
} from "../store/thunks";

const handlePaending = (state) => {
  state.isLoading = true;
};

const handleReject = (state, { payload }) => {
  state.error = payload;
};

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactSlice = createSlice({
  name: "chats",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getChatsThunk.pending, handlePaending)
      .addCase(getChatsThunk.rejected, handleReject)
      .addCase(getChatsThunk.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(createChatThunk.pending, handlePaending)
      .addCase(createChatThunk.rejected, handleReject)
      .addCase(createChatThunk.fulfilled, (state, { payload }) => {
        state.items = [payload, ...state.items];
      })
      .addCase(updateChatThunk.pending, handlePaending)
      .addCase(updateChatThunk.rejected, handleReject)
      .addCase(updateChatThunk.fulfilled, (state, { payload }) => {
        state.items = [payload, ...state.items];
      })
      .addCase(deleteChatThunk.pending, handlePaending)
      .addCase(deleteChatThunk.rejected, handleReject)
      .addCase(deleteChatThunk.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item._id !== payload._id);
      })
      .addCase(sendMessageThunk.pending, handlePaending)
      .addCase(sendMessageThunk.rejected, handleReject)
      .addCase(sendMessageThunk.fulfilled, (state, { payload }) => {
        state.items = [payload, ...state.items];
      });
  },
});

export const contactsReducer = contactSlice.reducer;
export const { addContactAction, removeContactAction } = contactSlice.actions;
