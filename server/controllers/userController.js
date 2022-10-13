const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');
const uuid = require('uuid');
const path = require("path");

class usersController {

    async changePassword(req, res) {
        try {
            const {
                newPassword
            } = req.body;
            const token = req.headers.authorization.split(" ")[1];
            const hashPassword = bcrypt.hashSync(newPassword, 7);

            const decodedData = jwt.verify(token, secret);
            const username = decodedData.username;

            const updatedUser = await User.updateOne({username}, {
                $set: {
                    password: hashPassword
                }
            });

            res.status(200).json({updatedUser, message: 'Change success'});
        } catch (e) {
            res.status(400).json({message: 'Changing password error'});
        }
    }

    async changeUserInfo(req, res){
        try {
            const {
                username,
                description
            } = req.body;

            const {photo} = req.files || req.body;
            let fileName = photo;

            if(typeof photo !== 'string'){
                fileName = uuid.v4() + '.jpg';
                photo.mv(path.resolve(__dirname, '..', 'static', fileName));
            }


            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const id = decodedData.id;

            const user = await User.findByIdAndUpdate(id, {
                $set: {
                    username: username,
                    description: description,
                    photo: fileName,
                    _token: token
                }
            })

            res.status(200).json({user});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Changing info error'});
        }
    }

    async getInfo(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const id = decodedData.id;

            const user = await User.findById(id);
            user.password = '';
            user._id = id;

            res.status(200).json({user});
        } catch (e) {
            res.status(400).json({message: 'Get info error'});
        }
    }

    async deleteProfile(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const id = decodedData.id;

            const user = await User.findByIdAndDelete(id)

            res.status(200).json({user, message: 'Delete success'});
        } catch (e) {
            res.status(400).json({message: 'Get info error'});
        }
    }
}

module.exports = new usersController();
