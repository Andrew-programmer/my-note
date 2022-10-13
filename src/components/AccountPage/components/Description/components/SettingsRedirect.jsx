import React from 'react';
import {useNavigate} from "react-router-dom";
import Navigator from "../../../../../utlis/globalFunctions";
import RedirectLink from "../../../../components/Redirect/RedirectLink/RedirectLink";


const SettingsRedirect = () => {
    const navigate = useNavigate();
    const navigator = new Navigator(navigate);
    const settings = navigator.settingsRoute;

    return (
        <>
            No description yet. Go to <RedirectLink route={settings}>settings</RedirectLink> for redacting.
        </>
    );
};

export default SettingsRedirect;
