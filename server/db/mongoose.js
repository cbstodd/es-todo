require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Needed to use promises vs callbacks.

mongoose.connect(
    // process.env.MLAB_HEROKU_URI ||
    process.env.MONGO_LOCAL_TEST_URI
);

module.exports.mongoose = mongoose;