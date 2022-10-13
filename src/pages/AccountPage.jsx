import React, {useContext} from 'react';
import {Context} from "../index";
import Divider from "@mui/material/Divider";
import AvatarSection from "../components/AccountPage/components/AvatarSection/AvatarSection";
import Username from "../components/AccountPage/components/Username/Username";
import Description from "../components/AccountPage/components/Description/Description";
import UserInfoBlock from "../components/AccountPage/components/UserInfoBlock";

const style = {
    mainSection: `flex-col flex md:flex-row h-full items-center p-2 mt-[10vh]`,
    avatar: `lg:!w-[35rem] lg:!h-[35rem] md:!w-[30rem] md:!h-[30rem] sm:!w-[30rem] sm:!h-[30rem] !w-[80vw] !h-[80vw]`,
    avatarContainer: ``,
    prodCountBlock: `flex flex-row justify-evenly sm:text-4xl text-2xl mt-5`,
    userInfoBlock: `flex flex-col w-full h-max p-2 m-4`,
    divider: `!my-2`,
    username: ``,
    description: `md:!max-h-[300px] lg:max-h-[200px] overflow-auto shadow-inner shadow-white`,
}

const AccountPage = () => {
    const store = useContext(Context);
    const {user} = store;
    const username = user.username;
    const description = user.description;

    return (
        <section className={style.mainSection}>
            <AvatarSection store={store}/>
            <UserInfoBlock username={username} description={description}/>
        </section>
    );
};

export default AccountPage;
