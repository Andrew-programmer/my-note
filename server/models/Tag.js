const {Schema, model} = require('mongoose');


const Tag = new Schema({
    _userId: {type: String, unique: false, required: true},
    title: {type: String, unique: false, required: true},
    color: {type: String, default: 'gray', required: false}
})

module.exports = model('Tag', Tag);
