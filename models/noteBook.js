const mongoose = require('mongoose');

const noteBookSchema = new mongoose.Schema({
    header: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('NoteBook', noteBookSchema);