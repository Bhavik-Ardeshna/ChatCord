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
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getGrpUsers
} = require('./utils/user');

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

    //Join the room and handle to send message to specific grp
    socket.on('JoinGrp', ({
        username,
        grp
    }) => {
        const user = userJoin(socket.id, username, grp);

        //join the respective grp using socket.join
        socket.join(user.grp);

        //Welcome event
        socket.emit('recieve', formatMsg(botName, "Welcome to Chat!"));

        // Broadcast when user enter or leave
        socket.broadcast.to(user.grp).emit('recieve', formatMsg(botName, `${user.username} has joined the chat`));

    });

    // Grabing msg from dom and emiting it to client.js to give output
    socket.on('message', (msg) => {
        const user = getCurrentUser(socket.id);
        socket.emit('message', formatMsg(user.username, msg));
        // Brodcast msg to all other user which append on left
        socket.broadcast.to(user.grp).emit('recieve', formatMsg(user.username, msg));
    });

    // Disconnect the socket when user leave
    socket.on('disconnect', (msg) => {
        const user = userLeave(socket.id);
        if(user){
            io.to(user.grp).emit('recieve', formatMsg(botName, `${user.username} has Left the chat`));
        }
 
    });
});





const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Running on port`, PORT));