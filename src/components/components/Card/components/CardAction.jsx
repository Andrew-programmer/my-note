import React, {useContext, useEffect, useState} from 'react';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DoneListButton from "../../DoneListButton/DoneListButton";
import {CardActionArea} from "@mui/material";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";

const style = {
    cardActionNoTags: `!h-full`,
    cardHeader: `!flex !justify-between !items-center`,
}

const CardAction = ({setCompleted, title, body, tagsLength, isList = false, listID, ...props}) => {
    const {lists} = useContext(Context);
    const [listBody, setListBody] = useState(() => {
        return isList ? lists.getListById(listID).body: '';
    });

    useEffect(() => {
        lists.setBody()
    }, [])

    const handleDoneButton = () => {
        lists.toggleAllCompleted(listID);
        lists.setBody()
        setListBody(lists.getListBody(listID));
    }

    return (
        <CardActionArea className={tagsLength === 0 ? style.cardActionNoTags : ''} {...props}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" className={style.cardHeader}>
                    {title}
                    {isList ?
                        <DoneListButton handleClick={handleDoneButton} listID={listID}/> : undefined}
                </Typography>
                <Typography variant="body2" color="text.secondary" className={'!text-ellipsis !w-full !whitespace-nowrap !overflow-hidden'}>
                    {isList ? listBody: body}
                </Typography>
            </CardContent>
        </CardActionArea>
    );
};

export default CardAction;
