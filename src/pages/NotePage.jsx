import React, {useContext} from 'react';
import Page from "../components/components/Page/Page";
import {Context} from "../index";
import {useParams} from "react-router";


const NotePage = () => {
    const {notes} = useContext(Context);
    const {id} = useParams();
    const noteId = id.replace(':', '');
    const note = notes.getNoteById(noteId);
    const noteTags = note.tags;

    return (
        <Page currentTags={noteTags} title={note.title} itemID={noteId}>
            {note.body}
        </Page>
    );
};

export default NotePage;
