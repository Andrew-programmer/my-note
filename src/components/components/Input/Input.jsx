import React from 'react';
import {TextField} from "@mui/material";

const style = {
    input: `!my-3`,
}


const Input = ({...props}) => {
    // const

    return (
        <TextField variant='outlined' color='secondary' {...props}
                   className={style.input}/>
    );
};

export default Input;
