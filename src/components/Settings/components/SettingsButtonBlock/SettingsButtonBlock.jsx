import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const SettingsButtonBlock = ({input = null, setError = null, stateFunction = null, handleClose}) => {

    const handleDone = async () => {
        if(typeof input === 'string'){
            if (!input.trim()) {
                return setError(true);
            }
            await stateFunction();
            await handleClose();
            return setError(false)
        }
        await handleClose();
    }

    return (
        <form className='flex justify-between'>
            <Button variant={'outlined'} color={'success'} onClick={handleDone}>
                <CheckIcon/>
            </Button>
            <Button variant={'outlined'} color={'error'} onClick={handleClose}>
                <ClearIcon/>
            </Button>
        </form>
    );
};

export default SettingsButtonBlock;
