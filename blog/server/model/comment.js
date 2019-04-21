const mongoose = require('mongoose');
const commtentData = new mongoose.Schema({
    name: String,
    email: String,
    content: String,
    time: String,
    image: String,
    commentId: String,
    msg: [
        {
            msgName: String,
            msgEmail: String,
            msgContent: String,
            msgTime: String,
            msgImage: String,
        }
    ]
});

module.exports = mongoose.model('comments', commtentData);