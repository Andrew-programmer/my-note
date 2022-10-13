const Note = require('../models/Note');
const jwt = require("jsonwebtoken");
const {secret} = require("../config");


class noteController {
    async addNote(req, res) {
        try {
            const {
                title,
                body,
                tags
            } = req.body;


            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const userId = decodedData.id;

            const note = new Note({
                title,
                body,
                tags,
                _userId: userId,
            });

            await note.save();
            return res.json({ note });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Creation error' });
        }
    }

    async updateNote(req, res) {
        try {
            const {
                title,
                body,
                tags
            } = req.body;
            const id = req.query.id;


            await Note.findByIdAndUpdate(id, {
                $set: {
                    title,
                    body,
                    tags,
                }
            });
            res.status(200).json({message: 'Updated success'});
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Update error' });
        }
    }

    async getAllNotes(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const userId = decodedData.id;

            const notes = await Note.find({_userId: userId});
            res.status(200).json({notes});
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async getNote(req, res) {
        try {
            let id = req.query.id;
            const note = await Note.findById(id);
            res.status(200).json({note, message: 'Get success'});
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async deleteNote(req, res) {
        try {
            const id = req.query.id;
            await Note.findByIdAndDelete(id);
            res.status(200).json({ message: 'Delete is ok' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Delete error' })
        }
    }

}

module.exports = new noteController();
