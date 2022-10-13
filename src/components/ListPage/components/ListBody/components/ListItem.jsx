import React, {useContext, useState} from 'react';
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Context} from "../../../../../index";
import {observer} from "mobx-react-lite";

import '../../styles.css'

const ListItem = observer(({i, checkCompleted, state, handleChange, handleDelete, children, listID, itemID}) => {
    const [listItems, setListItems] = state;
    const [value, setValue] = useState(children || '');
    const {lists} = useContext(Context);


    const handleInputChange = (i, value) => {
        const newItems = [...listItems.map((item, index) => {
            return {
                ...item,
                text: index === i ? value : item.text
            }
        })];
        setListItems(newItems);
        lists.redact(listID, null, newItems, null);
    }


    return (
        <div
            key={i}
            style={{
                filter: checkCompleted(itemID) ? 'blur(2px)' : null,
                backgroundColor: checkCompleted(itemID) ? 'rgb(247,237,255)' : 'whitesmoke',
            }}
            className={'test'}
        >
            <div contentEditable={false} className={'overflow-hidden w-full flex items-center'}>
                <Checkbox color={'secondary'} onChange={() => handleChange(itemID)} checked={checkCompleted(itemID)}/>
                <input className={'focus-visible:outline-0 whitespace-nowrap bg-transparent h-full'} value={value}
                       onChange={async event => {
                           await setValue(event.target.value);
                           await handleInputChange(i, event.target.value);
                       }} disabled={checkCompleted(itemID)}/>
            </div>
            {
                listItems.length >= 2 ?
                    <IconButton contentEditable={false} onClick={() => handleDelete(i)}>
                        <DeleteIcon color={"error"}/>
                    </IconButton> : null
            }
        </div>
    );
});

export default ListItem;
