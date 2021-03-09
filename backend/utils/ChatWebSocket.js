const CHAT_BOT = "Coffee Shop Bot";
//chat requirements
const formatMessage = require("./messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./connectedUsers");
//socket.io Events
//Listening for client connection
/**
 * If you would like to emit a message to the single user that connects to the server use socket.emit()
 * If you would like to emit a message to everybody excepts the user who just connected to the server use socket.broadcast.emit()
 * If you would like to broadcast to everybody use io.emit()
 */
module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, room }) => {
      //Join room
      const user = userJoin(socket.id, username, room);
      socket.join(user.room);
      //Welcome connect user
      socket.emit(
        "message",
        formatMessage(CHAT_BOT, `Welcome to ${user.room} !!!`)
      );

      //Broadcat when a user connects
      //To broadcast to a specific room, you need to use socket.broadcast.to('roomName').emit()
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          formatMessage(
            CHAT_BOT,
            `${user.username} has joined the ${user.room}`
          )
        );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
      //Listen for incoming chatMessage
      socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg));
      });

      //Handling User disconnect Events
      socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
          io.to(user.room).emit(
            "message",
            formatMessage(CHAT_BOT, `${user.username} has disconnected`)
          );

          // Send users and room info
          socket.broadcast.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
          });
        }
      });
    });
  });
};
