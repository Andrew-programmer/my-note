import * as React from 'react';
import Button from '@mui/material/Button';

import Input from "../../Input/Input";
import ModalTemplate from "../ModalTemplate";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {useContext, useEffect, useState} from "react";
import {Context} from "../../../../index";
import SettingsButtonBlock from "../../../Settings/components/SettingsButtonBlock/SettingsButtonBlock";


export default function ChangeInfoModal({open, handleClose}) {
    const {user} = useContext(Context);

    const [nameValue, setNameValue] = useState(user.username);
    const [descriptionValue, setDescriptionValue] = useState(user.description);
    const [photoValue, setPhotoValue] = useState(user.photo);
    const [error, setError] = useState(false);

    const updateUser = async (formData) => {
        const response = await user.fetchNewUser(formData);
        return response;
    }


    const setNewUserInfo = () => {
        const formData = new FormData();


        formData.append('username', nameValue);
        formData.append('description', descriptionValue);
        formData.append('photo', photoValue);


        updateUser(formData).then(res => {
            user.user = res.user;
            user.user.token = JSON.parse(localStorage.getItem('token'));
        })

    }

    const handleCloseExtended = () => {
        handleClose();
        setError(false);
    }

    return (
        <ModalTemplate open={open}>
            <Button variant="outlined" component="label" startIcon={<PhotoCamera/>} color={"secondary"}>
                Choose new photo
                <input hidden accept="image/*" type="file" onChange={event => setPhotoValue(event.target.files[0])}/>
            </Button>

            <Input label={'Username'}
                   placeholder={'Username...'}
                   error={error}
                   helperText={error ? 'Fill input' : ''}
                   required
                   autoFocus
                   onChange={event => setNameValue(event.target.value)}
                   value={nameValue}
            />
            <Input label={'About'} placeholder={'Tell something about you...'}
                   multiline
                   maxRows={5}
                   rows={5}
                   onChange={event => setDescriptionValue(event.target.value)}
                   value={descriptionValue}
            />

            <SettingsButtonBlock handleClose={handleCloseExtended} setError={setError} input={nameValue}
                                 stateFunction={setNewUserInfo}/>
        </ModalTemplate>
    );
}
