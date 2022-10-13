import * as React from 'react';
import ModalTemplate from "../ModalTemplate";
import {SketchPicker} from "react-color";
import Button from "@mui/material/Button";
import {useContext, useState} from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";

const style = {
    buttonsContainer: `flex flex-row justify-between`
}

const ColorPickerModal = observer(({open, handleClose, initialColor, tagID}) => {
    const [sketchPickerColor, setSketchPickerColor] = useState(initialColor);
    const {tags} = useContext(Context);

    const handleChange = async (color) => {
        await setSketchPickerColor(color.rgb);
        color = color.rgb;
        await tags.redactTag(tagID, null, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
    }


    return (
        <ModalTemplate open={open}>
            <SketchPicker
                onChange={(color) => {
                    handleChange(color);
                }}
                onClick={(event) => event.stopPropagation()}
                className={'!mb-3 !mx-auto'}
                color={sketchPickerColor}
            />
            <div className='flex justify-between'>
                <Button variant={'outlined'} color={'success'}
                        onClick={(event) => handleClose(event, sketchPickerColor)}>
                    <CheckIcon/>
                </Button>
                <Button variant={'outlined'} color={'error'} onClick={(event) => handleClose(event, initialColor)}>
                    <ClearIcon/>
                </Button>
            </div>
        </ModalTemplate>
    );
})

export default ColorPickerModal;
