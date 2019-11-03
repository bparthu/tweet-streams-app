const TwitterClient = require('./models/TwitterClient');
const config = require('./config');

const client = new TwitterClient();
const stream = client.connect(config).stream('statuses/filter', 'javascript');

stream.on('data', function(event) {
    console.log('received data');
    console.log(event.text);
});

stream.on('end', function() {
    console.log('stream destroyed');
})

stream.on('error', function(error) {
    throw error;
});

setTimeout(stream.destroy, config.T_STREAM_TIMEOUT);