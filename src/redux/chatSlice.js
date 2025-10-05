import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatrooms: [],
  currentChatroom: null,
  messages: [],
  isLoading: false,
  isTyping: false,
  darkMode: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatrooms: (state, action) => {
      state.chatrooms = action.payload;
    },
    addChatroom: (state, action) => {
      state.chatrooms.push(action.payload);
    },
    removeChatroom: (state, action) => {
      state.chatrooms = state.chatrooms.filter(
        (chatroom) => chatroom.id !== action.payload
      );
    },
    setCurrentChatroom: (state, action) => {
      state.currentChatroom = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  setChatrooms,
  addChatroom,
  removeChatroom,
  setCurrentChatroom,
  setMessages,
  addMessage,
  setIsLoading,
  setIsTyping,
  setDarkMode,
  toggleDarkMode,
} = chatSlice.actions;

export default chatSlice.reducer;