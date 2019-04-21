//用户表的数据模型
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    'Id':Number,
    'Name': String,
    'Password': String,
    'Power': Number,
});

module.exports = mongoose.model('user', userSchema);
