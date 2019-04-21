const mongoose = require('mongoose');
const messageData = new mongoose.Schema({
    title: String,
    answer: String,
    userId: Number,
});

module.exports = mongoose.model('messages', messageData);