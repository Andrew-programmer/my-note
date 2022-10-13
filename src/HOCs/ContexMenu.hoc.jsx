import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Navigator, {
    getParentUntilAttr,
    ListContextMenuFunctions,
    NoteContextMenuFunctions
} from "../utlis/globalFunctions";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const ContexMenuHoc = (WrappedComponent, target, params) => {

    return observer(function Component({id}) {
        const navigate = useNavigate();
        const navigator = new Navigator(navigate);
        const {notes, lists} = useContext(Context);
        const [targetType] = useState(() => {
            return getParentUntilAttr(params.anchorEl, 'data-name');
        })

        const notesMenu = new NoteContextMenuFunctions(notes, navigator);
        const listMenu = new ListContextMenuFunctions(lists, navigator);


        const cardsMenuItems = [
            [() => {
            debugger
                if (targetType === 'list') {
                    listMenu.deleteItem(id);
                } else {
                    notesMenu.deleteItem(id)
                }
                params.setAnchorEl(null);
            }, 'Delete'],
        ]

        const listMenuItems = [
            ...cardsMenuItems,
            [() => {
                listMenu.toggleComplete(id);
                params.setAnchorEl(null);
            }, 'Toggle complete'],
            [() => {
                listMenu.toggleArchive(id)
                params.setAnchorEl(null);
            }, 'Archive']
        ]

        const mainMenuItems = [
            [() => {
                notesMenu.handleNoteAdd()
                params.setAnchorEl(null);
            }, 'Add new note'],
            [() => {
                listMenu.handleListAdd()
                params.setAnchorEl(null);
            }, 'Add new list']
        ]

        const chooseContexMenu = (target) => {
            switch (target) {
                case 'card':
                    return cardsMenuItems;
                case 'list':
                    return listMenuItems;
                default:
                    return mainMenuItems;
            }
        }

        return (
            <WrappedComponent open={params.open} anchorEl={params.anchorEl} handleClose={params.handleClose}
                              menuItems={chooseContexMenu(target)}/>
        )
    });
};

export default ContexMenuHoc;
