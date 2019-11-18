const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env')});

module.exports = {
    T_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    T_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
    T_TOKEN_KEY: process.env.TWITTER_ACCESS_TOKEN_KEY,
    T_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    T_STREAM_TIMEOUT: parseInt(process.env.TWITTER_STREAM_TIMEOUT),
    PORT: process.env.PORT
}