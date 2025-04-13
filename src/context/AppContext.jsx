import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const { user } = useUser();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const createNewChat = async () => {
    if (!user) return;
    const newChat = { id: Date.now(), name: "New Chat" }; // example stub
    await axios.post("/api/chat/create", {
      userId: user.id,
      chatId: newChat.id,
      chatName: newChat.name,
    });
    setChats((prevChats) => [...prevChats, newChat]);
  };

  const fetchUserChats = async () => {
    if (!user) return;
    setLoading(true);
    const response = await axios.get(`/api/chat/${user.id}`);
    setChats(response.data);
    setLoading(false);
  };

  const deleteChat = async (chatId) => {
    if (!user) return;
    await axios.delete(`/api/chat/${chatId}`);
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
  };

  const value = {
    user,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    createNewChat,
    fetchUserChats,
    deleteChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
