const {Schema, model} = require('mongoose');


const Note = new Schema({
    _userId: {type: String, unique: false, required: true},
    body: {type: String, required: true},
    title: {type: String, required: true},
    tags: {type: Array, default: []}
})

module.exports = model('Note', Note);
