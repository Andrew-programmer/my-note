import AsyncActions from "./fetch";
import {addNoteUrl, getAllNotesUrl, noteByIdUrl} from "../../urls/notesUrls";

class NotesAsyncActions extends AsyncActions{
    async fetchAllNotes(token){
        return await this.GET(getAllNotesUrl, this.authorization(token));
    }

    async addNote(note, token){
        return await this.POST(addNoteUrl, this.formatData(note), this.authorization(token));
    }

    async deleteNote(id, token){
        return await this.DELETE(noteByIdUrl(id), this.authorization(token));
    }

    async updateNote(note, token){
        return await this.PUT(noteByIdUrl(note._id), this.formatData(note), this.authorization(token));
    }

}

const NoteActions = new NotesAsyncActions();

export default NoteActions;
