const express = require('express');
const connectDb = require('./db');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000/',
  },
});
const PORT = process.env.PORT || 8080;
const cors = require("cors");
app.use(cors())
app.use(express.json())

connectDb()


// Following code is used for routes:



app.use("/api/auth", require('./routes/auth'));
app.use("/api/messages", require('./routes/messages'));




// Following code establish connection between client and backend:



// global.onlineUsers = new Map();
// io.on('connection', (socket) => {
//   console.log('A user has connected with id: ', socket.id);

//   socket.on('join', (roomId) => {
//     socket.join(roomId);
//     console.log('user joined room:', roomId);
//   });


//   socket.on('private_message', (data) => {
//     console.log(`Room Id ${data.roomId} has message: ${data.newMessage}`);
//     socket.broadcast.to(data.roomId).emit('specific_message', data.newMessage);
//     console.log("Connected User: ", io.sockets.connected)
//   });

//   socket.on('disconnect', () => {
//     console.log('A user has disconnected');
//   });
// });


// Following code is the new code for socket.io:

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("User connected with id: ", socket.id)
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

http.listen(PORT, () => {
  console.log(`Socket.io server listening on port ${PORT}`);
});