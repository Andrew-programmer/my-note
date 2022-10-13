import React, {useContext, useEffect, useRef, useState} from 'react';
import Tag from "../Tag/Tag";
import CheckboxesTags from "../AutocompleteTags/AutocompleteTags";
import {Context} from "../../../index";
import autosize from "autosize/dist/autosize";
import AddButton from "../AddButton/AddButton";

const style = {
    main: `w-full h-min overflow-x-hidden`,
    contentMain: `h-min p-2 pb-[3rem]`,
    title: `sm:text-4xl text-3xl focus-visible:outline-0 w-min`,
    body: `my-4 sm:text-2xl text-xl border rounded p-4 mb-[3rem] focus-visible:outline-0 w-full resize-none h-min`,
    tagsContainer: `transition fixed bottom-0 p-2 bg-white shadow w-full focus-visible:outline-0 focus-visible:shadow-black flex items-center`,
}

const Page = ({children, currentTags, title, itemID, isList = null, handleListItemAdd = null}) => {
    const {tags, notes, lists} = useContext(Context);

    const [titleValue, setTitleValue] = useState(title);
    const [bodyValue, setBodyValue] = useState(children);
    const [pageTags, setPageTags] = useState(tags.getTagsByIDs(currentTags));

    //
    const handleTitleInput = (event, state, id) => {
        setTitleValue(event.target.value);
        state.redact(id, event.target.value);
    }

    const handleNoteTitleInput = (event) => {
        handleTitleInput(event, notes, itemID);
    }

    const handleListTitleInput = (event) => {
        handleTitleInput(event, lists, itemID);
    }
    //

    const handleBodyInput = (event, id) => {
        setBodyValue(event.target.value);
        notes.redact(id, null, event.target.value);
    }

    //
    const handleTagsChange = (newValue, state, id) => {
        setPageTags(newValue);
        state.redact(id, null, null, tags.getTagsIDs(newValue));
    }

    const handleNoteTagsChange = (newValue) => {
        handleTagsChange(newValue, notes, itemID)
    }
    const handleListTagsChange = (newValue) => {
        handleTagsChange(newValue, lists, itemID)
    }
    //

    useEffect(() => {
        autosize(document.querySelector('#body'));
    }, [])

    return (
        <section className={style.main}>
            <section className={style.contentMain}>
                <input className={style.title} value={titleValue}
                       onChange={event => isList ? handleListTitleInput(event) : handleNoteTitleInput(event)}
                       maxLength={10}/>
                {
                    isList ? children : <textarea className={style.body} id={'body'} value={bodyValue}
                                                  onChange={event => handleBodyInput(event, itemID)}/>
                }

            </section>
            <footer className={style.tagsContainer}>
                <CheckboxesTags noteTags={pageTags}
                                handleTagsChange={isList ? handleListTagsChange : handleNoteTagsChange}/>
                {isList ?
                    <AddButton onClick={handleListItemAdd}/>
                    : null}
            </footer>
        </section>
    );
};

export default Page;
