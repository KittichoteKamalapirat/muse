"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(3003, {
    cors: {
        origin: ["http://localhost:19000", "http://localhost:19001"],
    },
});
io.on("connection", (socket) => {
    console.log("id", socket.id);
    console.log("socket started");
    socket.on("incrementUpvote", (placeId, songId, upvotesNum) => {
        console.log("placeId", placeId);
        console.log("songId", songId);
        console.log("upvotesNum", upvotesNum);
        io.emit("broadcastIncrementUpvote", placeId, songId, upvotesNum + 1);
    });
});
//# sourceMappingURL=index.js.map