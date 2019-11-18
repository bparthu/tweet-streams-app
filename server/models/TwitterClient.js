const TwitterClientFactory = require('./TwitterClientFactory');

let singletonConnection;
class TwitterClient {
    static getConnection(config) {
        if(!singletonConnection) {
            singletonConnection = new TwitterClientFactory(config);
        }
        return singletonConnection;
    }
}

module.exports = TwitterClient;