let express = require('express');
app = express(); //
let server = require('http').createServer(app);
let io = require('socket.io')(server);

server.listen(5000);

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.sockets.on('connection', function (socket) {
    console.log('Підключення');
    connections.push(socket);

    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Відключено');
    });

    socket.on('send mess', function (data) {
        io.sockets.emit('add mess', { mess: data.mess, name: data.name });
    });
});
