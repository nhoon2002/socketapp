const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const http = require("http");
const socketIo = require("socket.io");


const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/ping', function (req, res) {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Test
//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", socket => {
    console.log("New client connected");

    //Here we listen on a new namespace called "incoming data"
    socket.on("outgoing alert", (data)=>{
      socket.broadcast.emit('new message', data);
    });
    socket.on("new message", (data) => {
      socket.emit('new message inc', data);
    });

    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(PORT, function() {
  console.log(`Running on ${PORT}`);
});
