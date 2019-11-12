const TwitterClient = require('./models/TwitterClient');
const config = require('./config');

const main = () => {
    const transformTweets = TwitterClient.createTransformStream(function(tweet) {
        // refactor this later
        console.log(`tracking - ${tweet.track}`);
        const data = tweet.res;
        let ret = {text: data.text};
        if(data.extended_tweet) {
            ret.extended_tweet = {full_text: data.extended_tweet.full_text}
        } else {
            if(data.retweeted_status) {
                ret.text = data.retweeted_status.text;
                if(data.retweeted_status.extended_tweet) {
                    ret.extended_tweet = {full_text: data.retweeted_status.extended_tweet.full_text}
                }
            }
        }
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