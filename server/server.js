const express = require('express')
const { Server } = require("socket.io");
const { v4: uuidV4} = require('uuid');
const http = require('http');

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 8080;

const io = new Server(server, {
  cors: '*', //this allows connection from any origin
});

//io connection with WebSocket
io.on('connection', (socket) => {
  // socket refers to the client socket that just got connected.
  // each socket is assigned an id
  console.log(socket.id, 'connected');
  // listen to username event

  socket.on('username', (username) => {
    console.log('username:', username);
    socket.data.username = username;
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});