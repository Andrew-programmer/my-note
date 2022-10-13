import React from 'react';
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const ExpandMoreButton = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default ExpandMoreButton;
