import { Server } from "socket.io";

const io = new Server(3003, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("id", socket.id);
  console.log("socket started");
});
