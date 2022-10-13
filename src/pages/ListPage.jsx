import React, {useContext, useState} from 'react';
import Page from "../components/components/Page/Page";
import {Context} from "../index";
import DraggableList from "../components/ListPage/components/ListBody/ListBody";
import {useParams} from "react-router";
import {observer} from "mobx-react-lite";

const ListPage = observer(() => {
    const {lists} = useContext(Context);
    const {id} = useParams();
    const listId = id.replace(':', '');
    const list = lists.getListById(listId);
    const state = useState(list.items)
    const [listItems, setListItems] = state;
    const listTags = list.tags;

    const handleAdd = async () => {
        const lastListItem = listItems[listItems.length - 1];
        const newListItems = [...listItems, {completed: false, text: '', id: lastListItem.id + 1}];
        await setListItems(newListItems);
        await lists.redact(listId, null, [...listItems, {completed: false, text: '', id: lastListItem.id + 1}], null);
    }

    return (
        <Page currentTags={listTags} title={list.title} itemID={listId} isList={true} handleListItemAdd={handleAdd}>
            <DraggableList state={state} listID={listId}/>
        </Page>
    );
});

export default ListPage;
