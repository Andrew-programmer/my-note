import {React, useContext, useEffect, useState} from 'react';
import {Input} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ColorPickerModal from "../../../components/Modal/ColorPickerModal/ColorPickerModal";
import IconButton from "@mui/material/IconButton";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import ColorDiv from "../../../components/ColorDiv/ColorDiv";

const style = {
    inputStyles: `!w-full !px-2 !pl-4 !m-1`,
    colorDiv: `rounded bg-black w-[20px] h-[20px] place-self-center`,
    tagContainer: `grid grid-cols-3 w-full px-2 pl-4 m-1 items-center`,
}

const SettingsTag = observer(({tag, state}) => {
    const [open, setOpen] = useState(false);
    const [divColor, setDivColor] = useState(tag.color);
    const [selectedID, setSelectedID] = state;

    const [input, setInput] = useState(tag.title);

    const {tags} = useContext(Context);

    const onTagClick = (event, id) => {
        event.stopPropagation();
        setSelectedID(id);
    }

    const checkScreenWidth = () => {
        return window.innerWidth < 375;
    }

    const handleClose = (event, color) => {
        setDivColor(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
        setOpen(false)
    }

    const onColorClick = (event) => {
        event.stopPropagation();
        setOpen(true);
    }

    const handleDeleteClick = (event, id) => {
        event.stopPropagation();
        tags.deleteTag(id);
    }

    const handleInput = (event) => {
        event.stopPropagation();
        setInput(event.target.value);
        tags.redactTag(tag._id, event.target.value);
    }

    useEffect(() => {
        setSelectedID(null)
    }, [])

    return (
        tag._id === selectedID ? <Input placeholder="Placeholder" color={'secondary'} value={input}
                                       onChange={(event) => handleInput(event)}
                                       onClick={(event) => event.stopPropagation()}
                                       onKeyPress={(event) => event.code === 'Enter' ? setSelectedID(null): null}
                                       className={style.inputStyles}
            />
            :
            <div className={style.tagContainer} key={tag._id}>
                <span onClick={(event) => onTagClick(event, tag._id)}
                      className={'inline-block overflow-auto max-w-[100%]'}
                >
                    {tag.title}
                </span>
                <ColorDiv onColorClick={onColorClick} divColor={divColor}/>
                <ColorPickerModal open={open} handleClose={handleClose} initialColor={divColor} tagID={tag._id}/>
                {checkScreenWidth() ?
                    <IconButton variant="outlined" color={'error'} onClick={event => handleDeleteClick(event, tag._id)}>
                        <DeleteIcon/>
                    </IconButton>
                    :
                    <Button variant="outlined" startIcon={<DeleteIcon/>} color={'error'}
                            onClick={event => handleDeleteClick(event, tag._id)}>
                        Delete
                    </Button>}
            </div>

    );
});

export default SettingsTag;
