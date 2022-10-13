import React, {useContext, useState} from 'react';
import {Divider} from "@mui/material";
import {useOutletContext} from "react-router";
import {Context} from "../index";
import Note from "../components/NotesPage/Note/Note";
import List from "../components/ListsPage/List/List";

const style = {
    searchDiv: `grid grid-cols-1 xl:grid-cols-5 2xl:grid-cols-7 md:grid-cols-4 sm:grid-cols-3`
}

const SearchPageHoc = (WrappedElement, store = 'notes') => {

    return function Component() {
        const [searchState] = useOutletContext();
        const [searchInput] = searchState;
        const {notes, lists, tags} = useContext(Context);

        const items = notes[store] || lists.getNotArchivedLists();
        const Card = store === 'notes' ? Note: List;

        const formatValue = (value) => {
            return value.toString().toLowerCase();
        }

        const checkFields = (obj, checkValues) => {
            const copyObj = {
                ...obj
            }
            copyObj.tags = tags.getTagsTextByIDs(obj.tags);
            const values = Object.values(copyObj);
            checkValues = checkValues.split(' ')
                                        .map(item => item.toLowerCase())
                                        .filter(Boolean);

            return checkValues.every(value => {
                return values.some(checkedValue => Boolean(~formatValue(checkedValue).indexOf(value)))
            })
        }





        return (
            <>
                <div>
                    <div className={style.searchDiv}>
                        {searchInput !== '' ?
                            items.filter(item => checkFields(item, searchInput)).map(item => (
                                <Card tagsIDs={item.tags} body={item.body} title={item.title} key={item._id} id={item._id}/>
                            ))
                        :
                            null
                        }
                    </div>
                    <Divider variant={"middle"}/>
                </div>
                <WrappedElement items={items}/>
            </>

        );
    };
};

export default SearchPageHoc;
