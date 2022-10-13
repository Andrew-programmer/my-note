import React, {useContext, useEffect, useState} from 'react';
import Collapse from "@mui/material/Collapse";
import {Context} from "../../../../index";
import SettingsTag from "../SettingTagsSection/SettingsTag";
import AddButton from "../../../components/AddButton/AddButton";
import {observer} from "mobx-react-lite";


const style = {
    tagsContainer: `!w-full`,
    addButtonContainer: 'text-right mt-3 w-full'
}

const SettingsTagsButtonCollapse = observer(({state}) => {
    const selectedInputState = useState(null);


    const {tags} = useContext(Context);

    const handleAddButtonClick = (event) => {
        event.stopPropagation();
        tags.addTag({
            title: 'tag :D',
        })
    }

    return (
        <Collapse in={state} timeout="auto" unmountOnExit className={style.tagsContainer}>
            {tags.tags.map(tag => {
                return (
                    <SettingsTag tag={tag} state={selectedInputState} key={tag._id}/>
                );
            })}
            <div className={style.addButtonContainer}>
                <AddButton onClick={event => handleAddButtonClick(event)} extraClassName={'!w-full !rounded'}/>
            </div>
        </Collapse>
    );
});

export default SettingsTagsButtonCollapse;
