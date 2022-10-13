import React from 'react';
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";


const style = {
    addButton: `!p-2 !bg-[#2e1534] hover:!bg-[#3d2044] !transition !mx-1`,
}

const AddButton = ({extraClassName, ...props}) => {
    return (
        <IconButton className={style.addButton + ' ' + extraClassName} contentEditable={false} {...props}>
            <AddIcon fontSize={'medium'} sx={{color: 'white'}}/>
        </IconButton>
    )
};

export default AddButton;
