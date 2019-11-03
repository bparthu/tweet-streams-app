const Twitter = require('Twitter');

class TwitterClient {
    connect(config) {
        this.client = new Twitter({
            consumer_key: config.T_CONSUMER_KEY,
            consumer_secret: config.T_CONSUMER_SECRET,
            access_token_key: config.T_TOKEN_KEY,
            access_token_secret: config.T_TOKEN_SECRET
          });
        return this;
    }

    stream(endpoint, track) {
        return this.client.stream(endpoint, {track});
    }
}

module.exports = TwitterClient;