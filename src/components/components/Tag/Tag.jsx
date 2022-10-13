import React from 'react';
import {Chip} from "@mui/material";

const style = {
    chip: `!m-1`
}

const Tag = ({text, handleDelete, color, ...props}) => {
    return (
        Boolean(handleDelete) ?
            <Chip variant="outlined" sx={{
                color: color,
                borderColor: color
            }} size="small" onDelete={handleDelete} label={text} className={style.chip} {...props}/>
            :
            <Chip variant="outlined" sx={{
                color: color,
                borderColor: color
            }} size="small" label={text} className={style.chip} {...props}/>

    );
};

export default Tag;
