const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(helmet());
app.get("/", (req, res) => {
  res.send(`server run on ${PORT}`);
});

// add  and implement socket.io
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const { addUser, users, removeUser } = require("./Users");
const { addChat, chats } = require("./Chat");

// socket config
io.on("connection", (socket) => {
  console.log("new user is login !");

  //connect & join & disconnect
  socket.on("join", (user) => {
    const currentUser = user;
    addUser(currentUser);
    //send msg
    socket.emit("join", `${currentUser} عزیز خوش اومدی`);
    socket.broadcast.emit("message", `کاربر  ${currentUser} به ما پیوست !`);
    socket.on("disconnect", () => {
      removeUser(currentUser);
      socket.broadcast.emit("message", `کاربر ${currentUser} ما رو ترک کرد !`);
    });

    //send all users
    const allUsers = users;
    socket.emit("allUser", allUsers);
    console.log("allusers", allUsers);
  });

  // get masseges
  const listChats = chats;
  socket.on("sendMsg", ({ massage, username }) => {
    console.log("msg :", massage);
    console.log("user :", username);
    addChat(massage, username);
  });
  // get masseges by current user
  socket.emit("getMsg",listChats);
  console.log("listChats :",listChats);
});

//run serever
server.listen(PORT, () => console.log(`server  run on ${PORT}`));
