const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');

const generateAccessToken = (id, username) => {
    const payload = {
        id,
        username
    };

    return jwt.sign(payload, secret, {expiresIn: "24h"});
};

class authController {
    async registration(req, res) {
        try {
            const {
                username,
                password,
            } = req.body;

            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({
                username,
                password: hashPassword,
            });

            await user.save();
            return res.json({message: 'User was created'});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error', statusCode: 400})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(401).json({message: 'User isn\'t registered'});
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: 'Password isn\'t right'});
            }

            const token = generateAccessToken(user._id, user.username);
            return res.json({jwt_token: token, user, message: 'User logged in'})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error', statusCode: 400})
        }
    }
}

module.exports = new authController();
