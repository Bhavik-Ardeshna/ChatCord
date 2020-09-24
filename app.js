const http = require('http');
const express = require('express');
const {
    static
} = require('express');
const {
    disconnect
} = require('process');

//getting utils
const formatMsg = require('./utils/message');

const botName = "Chat Bot"
const app = express();


const server = http.createServer(app);

//passing server inside socket to make WEBSOCKET
const io = require('socket.io')(server);

//Access to the Static files
app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/view'));


app.use('/', (req, res, next) => {
    res.sendFile(__dirname + '/view/index.html');
});

//Starting socket connections
io.on('connection', (socket) => {

    //Welcome event
    socket.emit('message', formatMsg(botName,"Welcome to Chat!"));

    // Broadcast when user enter or leave
    socket.broadcast.emit('message', formatMsg('USER',"user enter"));

    // Grabing msg from dom and emiting it to client.js to give output
    socket.on('message', (msg) => {
        io.emit('message', formatMsg('USER',msg));
        // Brodcast msg to all other user which append on left
        socket.broadcast.emit('recieve', formatMsg('USER',msg));
    });


    // Disconnect the socket when user leave
    socket.on('disconnect', (msg) => {
        io.emit('message', formatMsg('USER','user leave'));
    });
});


const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Running on port`, PORT));