const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/bancodedados', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection ;