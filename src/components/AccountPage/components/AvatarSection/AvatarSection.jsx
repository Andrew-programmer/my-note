import {React} from 'react';
import Avatar from "@mui/material/Avatar";
import {getPhotoUrl} from "../../../../urls/userUrls";

const style = {
    avatar: `lg:!w-[35rem] lg:!h-[35rem] md:!w-[30rem] md:!h-[30rem] sm:!w-[30rem] sm:!h-[30rem] !w-[80vw] !h-[80vw]`,
    prodCountBlock: `flex flex-row justify-evenly sm:text-4xl text-2xl mt-5`,
}

const AvatarSection = ({store}) => {
    const {notes, lists, user} = store
    const photo = user.photo;
    console.log(user);

    return (
        <figure>
            <Avatar className={style.avatar} src={getPhotoUrl(photo)}/>
            <figcaption className={style.prodCountBlock}>
                <span>Notes: {notes.notes.length}</span>
                <span>Lists: {lists.lists.length}</span>
            </figcaption>
        </figure>
    );
};

export default AvatarSection;
