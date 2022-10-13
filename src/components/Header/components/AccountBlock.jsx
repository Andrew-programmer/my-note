import React from 'react';
import AccountMenu from "./Avatar";

const style = {
    mainDiv: `flex bg-[#2e1534] items-center w-max justify-between`
}

const AccountBlock = () => {
    return (
        <div className={style.mainDiv}>
            <AccountMenu/>
        </div>
    );
};

export default AccountBlock;
