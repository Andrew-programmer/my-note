import React from 'react';
import SettingsRedirect from "./components/SettingsRedirect";

const style = {
    description: `md:!max-h-[300px] lg:max-h-[200px] overflow-auto shadow-inner shadow-white`,
}

const Description = ({text}) => {
    return (
        <div className={style.description}>
            {text || <SettingsRedirect/>}
        </div>
    );
};

export default Description;
