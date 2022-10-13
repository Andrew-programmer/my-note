const {Schema, model} = require('mongoose');


const List = new Schema({
    _userId: {type: String, unique: false, required: true},
    title: {type: String, required: true},
    completed: {type: Boolean, default: false},
    archived: {type: Boolean, required: false, default: false},
    body: {type: String, required: false},
    tags: {type: Array, required: false, default: []},
    items: {type: Array, required: true},
    finishDate: {type: Number, required: false, default: 0},
    creationDate: {type: Number, required: true}
})

module.exports = model('List', List);
