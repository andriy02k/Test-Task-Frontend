import axios from "axios";

export const api = axios.create({
  baseURL: "https://chats-task.onrender.com/api/chats",
});
