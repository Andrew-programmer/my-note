import React, {useContext} from 'react';
import ListItem from "./ListItem";
import {useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../../index";
import {TransitionGroup} from 'react-transition-group';
import Collapse from '@mui/material/Collapse';

const ListItemsBody = observer(({state, listID, handleDelete}) => {
    const {lists} = useContext(Context);
    const [completedItems, setCompletedItems] = useState(() => lists.getCompletedItems(listID));
    const [listItems] = state;


    const handleChange = (id) => {
        if (!~completedItems.indexOf(id)) {
            setCompletedItems([...completedItems, id]);
        } else {
            setCompletedItems(completedItems.filter(item => item !== id));
        }
        lists.toggleCompleted(listID, id);
    }


    const checkCompleted = (id) => {
        return Boolean(~completedItems.indexOf(id));
    }




    return (
            <TransitionGroup>
                {listItems.map((item, index) => (
                    <Collapse key={item.id}>
                        <ListItem checkCompleted={checkCompleted} key={item.id} itemID={item.id} i={index}
                                  state={state}
                                  handleChange={handleChange} listID={listID} handleDelete={handleDelete}>{item.text}</ListItem>
                    </Collapse>
                ))}
            </TransitionGroup>
    );
});

export default ListItemsBody;
