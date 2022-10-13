import React, {useContext} from 'react';
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const DoneListButtonTemplate = observer(({state, handleClick, listID}) => {
    const [completed, setCompleted] = state;

    const handleCompletedClick = (event) => {
        event.stopPropagation();
        setCompleted(prevState => !prevState);
        handleClick();
    }

    return (
        <IconButton variant={'contained'} color={completed ? 'secondary': 'default'} onClick={handleCompletedClick}>
            <DoneIcon/>
        </IconButton>
    );
});

export default DoneListButtonTemplate;
