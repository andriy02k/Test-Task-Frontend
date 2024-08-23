import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getChats,
  createChat,
  updateChat,
  deleteChat,
  sendMessage,
} from "../api/chatApi.js";

export const getChatsThunk = createAsyncThunk(
  "chats/getChats",
  async (_, { rejectWithValue }) => {
    try {
      return await getChats();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createChatThunk = createAsyncThunk(
  "chats/createChat",
  async (userData, { rejectWithValue }) => {
    try {
      return await createChat(userData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateChatThunk = createAsyncThunk(
  "chats/updateChat",
  async ({ id, newData }, { rejectWithValue }) => {
    try {
      return await updateChat({ id, newData });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteChatThunk = createAsyncThunk(
  "chats/deleteChat",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteChat(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendMessageThunk = createAsyncThunk(
  "chats/sendMessage",
  async ({ id, message }, { rejectWithValue }) => {
    try {
      return await sendMessage({ id, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
