import React from 'react';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {CardActions} from "@mui/material";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const style = {
    cardTagsArea: `!flex !flex-row !w-full !flex-wrap !overflow-hidden !h-min !px-4`,
}

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const CardActionsArea = ({expanded, toggleExpand, tags}) => {
    return (
        <CardActions className={style.cardTagsArea}>
            <ExpandMore
                expand={expanded}
                onClick={toggleExpand}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon/>
            </ExpandMore>
            {!expanded ? `+${tags.length} tags` : null}
        </CardActions>
    );
};

export default CardActionsArea;
