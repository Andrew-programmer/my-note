import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CreateIcon from '@mui/icons-material/Create';
import Navigator, {ListContextMenuFunctions, NoteContextMenuFunctions} from "../../../utlis/globalFunctions";
import {useContext} from "react";
import {Context} from "../../../index";
import {useNavigate} from "react-router-dom";

const style = {
    speedTail: `md:!hidden !fixed`
}




export default function OpenIconSpeedDial() {
    const {notes, lists} = useContext(Context);
    const navigate = useNavigate();
    const navigator = new Navigator(navigate);

    const noteFunction = new NoteContextMenuFunctions(notes, navigator);
    const listFunction = new ListContextMenuFunctions(lists, navigator);


    const actions = [
        { icon: <CreateIcon />, name: 'Add new Note', action: noteFunction.handleNoteAdd.bind(noteFunction) },
        { icon: <PlaylistAddIcon />, name: 'Add new List', action: listFunction.handleListAdd.bind(listFunction) },
    ];

    return (
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                }}
                icon={<SpeedDialIcon sx={{backgroundColor: '#2e1534'}}/>}
                className={style.speedTail}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.action}
                    />
                ))}
            </SpeedDial>
    );
}
