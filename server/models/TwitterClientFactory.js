const Twitter = require('Twitter');
const StreamHelper = require('../helpers/StreamHelper');


class TwitterClientFactory {
    constructor(config) {
        this.streamTimeout = config.T_STREAM_TIMEOUT;
        this.client = new Twitter({
            consumer_key: config.T_CONSUMER_KEY,
            consumer_secret: config.T_CONSUMER_SECRET,
            access_token_key: config.T_TOKEN_KEY,
            access_token_secret: config.T_TOKEN_SECRET
          });
        return this;
    }

    createStream(endpoint, track) {
        const rs = StreamHelper.createStream();
        const ts = StreamHelper.createStream((tweet) => {
            const data = tweet.res;
            let ret = {track: tweet.track, text: tweet.res.text, url: `http://twitter.com/${data.user.screen_name}/status/${data.id_str}`, hashtags: tweet.res.entities.hashtags};
            return JSON.stringify(ret);
        });
        this.tweetStream = this.client.stream(endpoint, {track});
        this.tweetStream.on('data', function(res) {
            rs.push({track, res});
        });

        this.tweetStream.on('end', function() {
            console.log('stream destroyed');
        })
        
        this.tweetStream.on('error', function(error) {
            throw error;
        });

        
        return rs.pipe(ts);
    }

    destroyStream() {
        this.tweetStream.destroy();
    }
}

module.exports = TwitterClientFactory;