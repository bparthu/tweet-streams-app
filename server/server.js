const TwitterClient = require('./models/TwitterClient');
const config = require('./config');


const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    path: '/events'
});

const Manager = require('./models/StateManager');
const Client = require('./models/Client');

const manager = new Manager();

const connection = TwitterClient.getConnection(config);

let stream;
function startStreaming(tracks, socket) {
    stream = connection.createStream('statuses/filter', tracks);

    stream.on('data', (data) => {
        socket.emit('tweet', data);
    });
} 


io.on('connection', function (socket){
    console.log('connected to client');
    
    const client = new Client(socket.client.id);
    client.onTrendChange(() => {
        manager.calcActiveTrend();
    });
    manager.addClient(client);
    socket.on('disconnect', () => {
        manager.deleteClient(client);
        console.log('client disconnected');
    });

    socket.on('input-trend', (trend) => {
        client.setTrend(trend);
        startStreaming(trend, socket);
    });

    setInterval(() => {
        console.log(Object.keys(manager.trendMap));
    },2000);
  
  });
  
  http.listen(3000, function () {
    console.log('listening on *:3000');
  });