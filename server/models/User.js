const {Schema, model} = require('mongoose');

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    description: {type: String, required: false, default: ''},
    photo: {type: String, required: false, default: ''}
})

module.exports = model('User', User);
