import { api } from "./api";

export const getChats = async () => {
  const { data } = await api.get(`/`);
  return data;
};

export const createChat = async (userData) => {
  const { data } = await api.post(`/`, userData);
  return data;
};

export const updateChat = async (id, newData) => {
  const { data } = await api.put(`/${id}`, newData);
  return data;
};

export const deleteChat = async (id) => {
  const { data } = await api.delete(`/${id}`);
  return data;
};

export const sendMessage = async (id, message) => {
  const { data } = await api.post(`/${id}/messages`, message);
  return data;
};
