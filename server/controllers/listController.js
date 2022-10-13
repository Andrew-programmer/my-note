const List = require('../models/List')
const jwt = require("jsonwebtoken");
const {secret} = require("../config");

class listController {
    async addList(req, res) {
        try {
            const {
                title,
                tags,
                body,
                items,
                completed
            } = req.body;

            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const userId = decodedData.id;

            const list = new List({
                _userId: userId,
                items,
                title,
                tags,
                body,
                creationDate: Date.now(),
                finishDate: 0,
                completed
            });

            await list.save();
            return res.json({list});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Creation error'});
        }
    }

    async updateList(req, res) {
        try {
            const {
                title,
                items,
                tags,
            } = req.body;

            const id = req.query.id;

            await List.findByIdAndUpdate(id, {
                $set: {
                    title,
                    items,
                    tags
                }
            });
            res.status(200).json({message: 'Updated success'});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Update error'});
        }
    }

    async getAllLists(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const userId = decodedData.id;
            const lists = await List.find({_userId: userId});
            res.status(200).json({lists});
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async getList(req, res) {
        try {
            const id = req.query.id;
            const list = await List.findById(id);
            res.status(200).json({list, message: 'Get success'});
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async toggleComplete(req, res) {
        try {
            const {
                value
            } = req.body;
            const id = req.query.id;

            await List.findByIdAndUpdate(id, {
                $set: {
                    completed: value
                }
            });
            res.status(200).json({message: 'Patch success'});
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async deleteList(req, res) {
        try {
            const id = req.query.id;
            await List.findByIdAndDelete(id);
            res.status(200).json({message: 'Delete is ok'});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Delete error'})
        }
    }

    async toggleArchive(req, res){
        try{
            const id = req.query.id;

            const list = await List.findById(id);

            await List.findByIdAndUpdate(id, {
                $set: {
                    archived: !list.archived,
                    finishDate: Date.now()
                }
            });
        }catch (e) {
            console.log(e);
            res.status(400).json({message: 'Set finish date error'})
        }
    }

    async setBody(req, res){
        try{
            const {body} = req.body;
            const id = req.query.id;
            await List.findByIdAndUpdate(id, {
                $set: {
                    body
                }
            });
        }catch (e) {
            console.log(e);
            res.status(400).json({message: 'Set body error'})
        }
    }


    async getListByIdFromReq(req){
        const id = req.query.id;
        await List.findById(id);
    }

}

module.exports = new listController();
