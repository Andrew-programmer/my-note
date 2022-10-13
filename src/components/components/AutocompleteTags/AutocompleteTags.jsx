import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Tag from "../Tag/Tag";
import {useContext} from "react";
import {Context} from "../../../index";
import ColorDiv from "../ColorDiv/ColorDiv";

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

export default function CheckboxesTags({noteTags, handleTagsChange}) {
    const {tags} = useContext(Context);

    const getLimitTags = (width) => {
        if (width <= 425) {
            return 2;
        } else if (width <= 768) {
            return 3;
        } else if (width <= 1024) {
            return 5;
        } else if (width <= 1440) {
            return 7;
        } else {
            return 11;
        }
    }
    const filterFunc = createFilterOptions();

    return (
        <Autocomplete
            multiple
            value={noteTags}
            onChange={(event, newValue) => {
                if (newValue && newValue.some(value => value.inputValue)) {
                    debugger
                    const newTag = newValue.filter(value => value.inputValue)[0];
                    tags.addTag({
                        title: newTag.inputValue,
                        color: '#000000'
                    })
                } else {
                    handleTagsChange(newValue)
                }
            }}
            sx={{
                width:'100%'
            }}
            options={tags.tags}
            limitTags={getLimitTags(window.innerWidth)}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            filterOptions={(options, params) => {
                const filtered = filterFunc(options, params);

                const {inputValue} = params;

                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            renderOption={(props, option, {selected}) => (
                !option.inputValue ? <li
                        {...props}
                        style={{
                            filter: selected ? 'blur(1px)' : '',
                            backgroundColor: selected ? 'rgb(247, 237, 255)' : '',
                            transition: '0.1s ease',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div className={'flex'}>
                            <ColorDiv divColor={option.color} extraStyles={'mr-2'}/>
                            {option.title}
                        </div>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{
                                marginRight: 8,
                            }}
                            color={"secondary"}
                            checked={selected}
                        />
                    </li> :
                    <li
                        {...props}
                        style={{
                            filter: selected ? 'blur(1px)' : '',
                            backgroundColor: selected ? 'rgb(247, 237, 255)' : '',
                            transition: '0.1s ease',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div className={'flex'}>
                            {option.title}
                        </div>
                    </li>

            )}
            renderInput={(params) => (
                <TextField {...params} label="Tags" placeholder="Tags" color={"secondary"}/>
            )}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Tag color={option.color} text={option.title} {...getTagProps({index})}/>
                ))
            }
        />
    );
}
