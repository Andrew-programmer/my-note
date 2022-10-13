import React, {useContext} from 'react';
import {Context} from "../../index";
import Note from "./Note/Note";
import {observer} from "mobx-react-lite";

const NotesPageBody = observer(({items}) => {

    return (
        <>
            {items.length === 0 ?
                <div className={'text-xl w-full col-span-3 p-2 md:block hidden'}>
                    No notes? Right click to create some note!
                </div>
                : items.map(note => (
                <Note tagsIDs={note.tags} body={note.body} title={note.title} key={note._id} id={note._id}/>
            ))}
        </>

    );
});

export default NotesPageBody;
