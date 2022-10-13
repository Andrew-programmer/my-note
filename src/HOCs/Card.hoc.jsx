import React, {useContext, useState} from 'react';
import Card from "@mui/material/Card";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const style = {
    card: `!m-2 !h-[150px] !ease-in !duration-200`,
    expandedCard: `!m-2 !shadow-[0px_-1px_7px_-4px_black] sm:!h-[150px] !ease-in !duration-200`,
}



const ExpandElementHoc = (isList) => (WrappedComponent) => {

    return observer(function Component({tagsIDs, body, title, id}) {
        const stylesState = useState(false);
        const [expanded] = stylesState;



        return (
            <Card sx={{maxWidth: 700}} className={expanded ? style.expandedCard : style.card} data-name={isList ? 'list' : 'card'} data-id={id}>
                <WrappedComponent stylesState={stylesState} isList={isList} tagsIDs={tagsIDs} body={body} title={title} id={id}/>
            </Card>
        )
    });
};

export default ExpandElementHoc;
