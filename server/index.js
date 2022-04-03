const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected:${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    // // 본인을 제외한 연결된 모든 사람들에게 보내는 메시지
    // socket.broadcast.emit("receive_message", data);

    // 특정 방에 들어간 사람들에게만 보내어지는 메시지
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => console.log("SERVER IS RUNNING"));
