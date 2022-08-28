"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(3003, {});
io.on("connection", (socket) => {
    console.log("id", socket.id);
    console.log("socket started");
});
//# sourceMappingURL=index.js.map