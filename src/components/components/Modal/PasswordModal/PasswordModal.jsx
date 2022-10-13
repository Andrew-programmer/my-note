import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Input from "../../Input/Input";
import ModalTemplate from "../ModalTemplate";
import {useContext, useState} from "react";
import {Context} from "../../../../index";
import SettingsButtonBlock from "../../../Settings/components/SettingsButtonBlock/SettingsButtonBlock";

export default function PasswordModal({open, handleClose}) {
    const {user} = useContext(Context);
    const inputState = useState('');
    const errorState = useState(false);

    const [passwordInput, setPasswordInput] = inputState;
    const [error, setError] = errorState;

    const setNewPassword = async () => {
        await user.password(passwordInput);
        setPasswordInput('');
    }

    const handleCloseExtended = () => {
        handleClose();
        setError(false);
    }


    return (
        <ModalTemplate open={open}>
            <Typography id="transition-modal-title" variant="h6" component="h2" className={'!mb-2'}>
                New password
            </Typography>
            <Input label={'Password'} placeholder={'Password...'} autoFocus value={passwordInput}
                   onChange={(event) => setPasswordInput(event.target.value)} error={error}
                   helperText={error ? 'Fill input' : ''} required/>
            <SettingsButtonBlock handleClose={handleCloseExtended} setError={setError} input={passwordInput} stateFunction={setNewPassword}/>
        </ModalTemplate>
    );
}
