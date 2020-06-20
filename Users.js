const users = [];

const addUser = (name) => {
  users.push(name);
};
const removeUser = (name) => {
  const index = users.findIndex((index) => index === name);
  if (index !== -1) return users.splice(index, 1)[0];
  
};

module.exports = { addUser, users, removeUser };
