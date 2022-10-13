import React, {useContext} from 'react'
import '../styles.css'
import ListItemsBody from "./components/ListItemsBody";
import AddButton from "../../../components/AddButton/AddButton";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";

const style = {
    addButton: `!p-2 !bg-[#2e1534] hover:!bg-[#3d2044] !transition`,
    addButtonContainer: `flex justify-end z-50 transition duration-150 ease-out`,
}

const DraggableList = observer(({state, listID}) => {
    const [listItems, setListItems] = state;
    const {lists} = useContext(Context)

    const handleDelete = (i) => {
        if (listItems.length >= 2) {
            const newListItems = lists.deleteItem(listID, i);
            setListItems(newListItems);
        }
    }

    return (
        <>
            <div className="content">
                <ListItemsBody state={state} listID={listID} handleDelete={handleDelete}/>
            </div>
        </>
    )
})

export default DraggableList;
