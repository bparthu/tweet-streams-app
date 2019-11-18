//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true, path: '/events'});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

// Add a connect listener
socket.on('disconnect', function (socket) {
    console.log('Disconnected!');
});

socket.on('tweet', (tweet) => {
    console.log(tweet);
})

console.log('input anytime to change search text');
process.stdin.on('data', (input) => {
    socket.emit('input-trend', input.toString().trim());
});