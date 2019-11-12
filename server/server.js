const TwitterClient = require('./models/TwitterClient');
const config = require('./config');

const main = () => {
    const transformTweets = TwitterClient.createTransformStream(function(tweet) {
        // refactor this later
        console.log(`tracking - ${tweet.track}`);
        const data = tweet.res;
        let ret = {text: data.text, url: `http://twitter.com/${data.user.screen_name}/status/${data.id_str}`};
        return ret;
    });
    
    const printTweets = TwitterClient.createWriteStream(function(data) {
        console.log(data);
    });
    
    
    const client = new TwitterClient();
    const connection = client.connect(config);
    connection
        .createReadStream('statuses/filter', process.argv[2] || 'javascript')
        .pipe(transformTweets)
        .pipe(printTweets);
}

main();