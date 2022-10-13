import {makeAutoObservable} from 'mobx'
import NoteActions from "./asyncActions/NotesActions";

export default class NotesStore {
    constructor() {
        this._notes = [
            // {
            //     _id: '1',
            //     _userId: '2',
            //     title: 'Note 1',
            //     body: 'Body 1',
            //     tags: [1, 2]
            // },
            // {
            //     _id: '2',
            //     _userId: '2',
            //     title: 'Title 2',
            //     body: 'Bod 2',
            //     tags: []
            // },
            // {
            //     _id: '3',
            //     _userId: '2',
            //     title: 'Suka 3',
            //     body: 'a',
            //     tags: ['Suka', 'Blyat', 'Nahui']
            // },
            // {
            //     _id: '4',
            //     _userId: '2',
            //     title: 'Hello 4',
            //     body: 'n',
            //     tags: ['Nice', 'Warning']
            // },
            // {
            //     _id: '5',
            //     _userId: '2',
            //     title: 'Note 5',
            //     body: 'Body 5',
            //     tags: ['Bad', 'Worse', 'Perfect', 'Beautiful']
            // },
            // {
            //     _id: '6',
            //     _userId: '2',
            //     title: 'Note 6',
            //     body: 'Body 6',
            //     tags: ['Yes', 'Note', 'Non', 'Danon']
            // }
        ]
        makeAutoObservable(this)
    }

    set notes(notes) {
        this._notes = notes;
    }

    get notes() {
        return this._notes;
    }

    async fetchAllNotes(token){
        const response =  await NoteActions.fetchAllNotes(token);
        const fetchedNotes = await response.json();
        this.setNotes(fetchedNotes.notes);
    }

    setNotes(notes){
        this._notes = notes;
    }

    getNoteById(id) {
        return this._notes.filter(note => note._id === id)[0];
    }

    async redact(id, newTitle = null, newBody = null, newTagsID = null) {
        const token = JSON.parse(localStorage.getItem('token'));

        this._notes.forEach((note, index) => {
            if (note._id === id) {
                const newNote = {
                    ...note,
                    title: newTitle || note.title,
                    body: newBody || note.body,
                    tags: newTagsID || note.tags
                };
                this._notes[index] = newNote;
                NoteActions.updateNote(newNote, token);
            }
        })
    }

    async deleteNote(id) {
        const token = JSON.parse(localStorage.getItem('token'));
        this._notes = this._notes.filter(note => note._id !== id);
        await NoteActions.deleteNote(id, token);
    }

    async addNote(note) {
        const token = JSON.parse(localStorage.getItem('token'));

        let response = await NoteActions.addNote(note, token);
        response = await response.json();
        const fetchedNote = response.note;

        this._notes.push(fetchedNote);

        return fetchedNote._id;
    }
}
