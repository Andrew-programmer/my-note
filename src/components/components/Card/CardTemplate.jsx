import {React, useContext} from 'react';
import CardAction from "./components/CardAction";
import Divider from "@mui/material/Divider";
import CardTagsSection from "./components/CardTagsSection";
import Navigator from "../../../utlis/globalFunctions";
import {useNavigate} from "react-router-dom";
import {Context} from "../../../index";

const style = {
    actionButtonStyle: `!h-full`
}

const CardTemplate = ({setCompleted, stylesState, tagsIDs, body, title, isList, id}) => {
    const {tags} = useContext(Context);

    const navigator = new Navigator(useNavigate());

    const currentTags = tags.getTagsByIDs(tagsIDs);

    const handleClick = () => {
        isList ?
            navigator.navigateToListPage(id) : navigator.navigateToNotePage(id)
    }

    return (
        <>
            <CardAction className={currentTags.length === 0 ? style.actionButtonStyle : ''} tagsLength={tags.length}
                        body={body} title={title} isList={isList} onClick={handleClick} listID={id}
                        setCompleted={setCompleted}/>
            {currentTags.length !== 0 ?
                <div>
                    <Divider variant={'middle'}/>
                    <CardTagsSection tags={currentTags} stylesState={stylesState}/>
                </div> : null}
        </>
    );
};

export default CardTemplate;
