const {Readable, Transform, Writable} = require('stream');

const createStream = (cb) => {
    const ts = new Transform({
        objectMode: true,
        transform(obj, encoding, callback) {
            callback(null, cb(obj, encoding));
        }
    });

    return ts;
}

module.exports = {createStream};