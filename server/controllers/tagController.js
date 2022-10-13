const Tag = require('../models/Tag');
const jwt = require("jsonwebtoken");
const {secret} = require("../config");


class tagController {
    async addTag(req, res) {
        try {
            const {
                title,
                color
            } = req.body;

            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const userId = decodedData.id;

            const tag = new Tag({
                title,
                color: color || '#000000',
                _userId: userId,
            });

            await tag.save();
            return res.json({tag});
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Creation error' });
        }
    }

    async getAllTags(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const userId = decodedData.id;

            const tags = await Tag.find({_userId: userId});
            res.status(200).json({tags});
        } catch (e) {
            res.status(400).json(e);
        }
    }

    // async getGlobalPriorityTags(req, res){
    //     try{
    //         const priorityTags = await Tag.find({isPriority: true, isGlobal: true});
    //         res.status(200).json({tags: priorityTags, message: "Success"});
    //     } catch (e) {
    //         res.status(400).json({message: "Error"});
    //     }
    //
    // }

    async getTag(req, res) {
        try {
            let id = req.query.id
            const tag = await Tag.findById(id);
            res.status(200).json({tag, message: 'Get success'});
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async deleteTag(req, res) {
        try {
            const id = req.query.id;
            await Tag.findByIdAndDelete(id);
            res.status(200).json({ message: 'Delete is ok' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Delete error' })
        }
    }

    async updateTag(req, res){
        try {
            const {
                title,
                color
            } = req.body;
            const id = req.query.id;

            console.log({title, color, id})

            await Tag.findByIdAndUpdate(id, {
                $set: {
                    title,
                    color
                }
            });
            res.status(200).json({ message: 'Update is ok' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Update error' })
        }
    }

}

module.exports = new tagController();
