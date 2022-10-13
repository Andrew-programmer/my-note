import React from 'react';
import SettingsIcon from "@mui/icons-material/Settings";
import {animated} from "react-spring";

const style = {
    span: `w-full text-left`,
    button: `flex flex-row justify-between !w-full m-2 md:mx-2 bg-[#f7edff] p-3 rounded hover:bg-[#efdbff] transition`,

}

const SettingsButton = ({children, animation, springRef,...props}) => {


    return (
        <button {...props} className={style.button}>
            <span className={style.span}>{children}</span>
            <animated.div style={{
                ...animation
            }} ref={springRef}>
                <SettingsIcon/>
            </animated.div>
        </button>
    );
};

export default SettingsButton;
