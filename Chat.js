const chats = [];


const addChat = (msg, user) => {
  chats.push({ user, msg });
};
const removeChats = (name) => {
  if (chats.length !== 0) chat.push(chats);
  const index = chat.findIndex((index) => index === name);
  if (index !== -1) return chat.splice(index, 1)[0];

  return chat;
};
module.exports = { chats, addChat,  };
