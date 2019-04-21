const mongoose = require('mongoose');
const labelData = new mongoose.Schema({
    'label': {
        type: String,
        default: 'normal'
    },
    'color': {
        type: String,
        default: '#000'
    },
    'number': {
        type: Number,
        default: 0
    },
    'userId': {
        type: Number,
        default: 888888
    }
});
module.exports = mongoose.model('label', labelData);