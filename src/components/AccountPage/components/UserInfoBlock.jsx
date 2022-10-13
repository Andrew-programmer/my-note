import React from 'react';
import Username from "./Username/Username";
import Divider from "@mui/material/Divider";
import Description from "./Description/Description";

const style = {
    userInfoBlock: `flex flex-col w-full h-max p-2 m-4`,
    divider: `!my-2`,
}

const UserInfoBlock = ({username, description}) => {
    return (
        <div className={style.userInfoBlock}>
            <Username>
                {username}
            </Username>
            <Divider color={'#2e1534'} className={style.divider}/>
            <Description text={description}/>
        </div>
    );
};

export default UserInfoBlock;
