import React from 'react';
import CardTagsArea from "./CardTagsArea";
import Collapse from "@mui/material/Collapse";

const CardCollapse = ({expanded, tags}) => {
    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardTagsArea tags={tags}/>
        </Collapse>
    );
};

export default CardCollapse;
