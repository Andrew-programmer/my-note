import React from 'react';
import SettingsTagsButton from "../components/Settings/components/SettingsTagsButton/components/SettingsTagsButton";
import PasswordSection from "../components/Settings/PasswordSection";
import InfoSection from "../components/Settings/InfoSection";
import ArchiveSection from "../components/Settings/ArchiveSection";


const style = {
    mainContainer: `md:w-[60%] px-4 flex flex-col mx-auto items-start`,

}

const Settings = () => {

    return (
        <>
            <div className={style.mainContainer} id={'settings'}>
                <PasswordSection/>
                <InfoSection/>
                <SettingsTagsButton/>
                <ArchiveSection/>
            </div>


        </>

    );
};

export default Settings;
