const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const { getCurrentUser, joinUser, userDisconnect } = require("./user");

app.use(express());

const port = 5000;

app.use(cors());

var server = app.listen(port, console.log(`Server is running on ${port}`));


const io = socket(server, {
  cors: {
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("joinRoom", (username, roomname, callback) => {
    try {
      if (username && roomname) {
        const user = joinUser(socket.id, username, roomname);
        socket.join(user.room);
        callback({ status: "OK" });
        socket.emit("message", {
          userId: user.id,
          username: "server",
          text: `Welcome ${user.username}`,
        });
        socket.broadcast.to(user.room).emit("message", {
          userId: user.id,
          username: "server",
          text: `${user.username} has joined the chat 👋`,
        });
      } else {
        callback({ status: "Bad" });
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("chat", (text) => {
    try {
      const user = getCurrentUser(socket.id);

      io.to(user.room).emit("message", {
        userId: user.id,
        username: user.username,
        text: text,
      });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    try {
      console.log("a user disconnected");
      const user = userDisconnect(socket.id);

      if (user) {
        io.to(user.room).emit("message", {
          userId: user.id,
          username: "server",
          text: `${user.username} has left the room 😔`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
});
