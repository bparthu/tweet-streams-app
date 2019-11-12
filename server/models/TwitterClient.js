const Twitter = require('Twitter');
const {Readable, Transform, Writable} = require('stream');


class TwitterClient {
    connect(config) {
        this.streamTimeout = config.T_STREAM_TIMEOUT;
        this.client = new Twitter({
            consumer_key: config.T_CONSUMER_KEY,
            consumer_secret: config.T_CONSUMER_SECRET,
            access_token_key: config.T_TOKEN_KEY,
            access_token_secret: config.T_TOKEN_SECRET
          });
        return this;
    }

    createReadStream(endpoint, track) {
        const rs = new Readable({objectMode: true, read() {}});
        const twitterStream = this.client.stream(endpoint, {track});
        twitterStream.on('data', function(res) {
            console.log('received data');
            rs.push({track, res});
        });

        twitterStream.on('end', function() {
            console.log('stream destroyed');
        })
        
        twitterStream.on('error', function(error) {
            throw error;
        });

        setTimeout(twitterStream.destroy, this.streamTimeout);

        return rs;
    }

    static createTransformStream(cb) {
        const ts = new Transform({
            objectMode: true,
            transform(obj, encoding, callback) {
                callback(null, cb(obj, encoding));
            }
        });

        return ts;
    }

    static createWriteStream(cb) {
        const ws = new Writable({
            objectMode: true,
            write(data, enc, done) {
                cb(data, enc);
                done();
            }
        });

        return ws;
    }
}

module.exports = TwitterClient;