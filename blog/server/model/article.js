//文章表的数据模型
const mongoose = require('mongoose');
const articleData = new mongoose.Schema({
    "title": String,
    "descript": String,
    "answer": String,
    "time": Number,
    "label": {
        type: String,
        name: 'label',
        default: 'normal'
    },
    "color": {
        type: String,
        name: 'color',
        default: '#bcafaf'
    },
    "userId": {
        type: String,
        name: 'userId',
        default: 888888
    },
    "articleId": String,
    "message": [
        {
            "name": String,
            "email": String,
            "content": String,
            "time": String,
            "image": String,
            "commentId": String,
        }
    ],
    "power":Boolean
});

module.exports = mongoose.model('article', articleData);