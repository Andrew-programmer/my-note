import React from 'react';
import {useNavigate} from "react-router-dom";
import Navigator from "../../../../utlis/globalFunctions";
import RedirectLink from "../RedirectLink/RedirectLink";

const ListsRedirect = () => {
    const navigate = useNavigate();
    const navigator = new Navigator(navigate);
    const listsRoute = navigator.listsRoute;

    return (
        <>
            No archive yet. Add some <RedirectLink route={listsRoute}>list</RedirectLink> here first.
        </>
    );
};

export default ListsRedirect;
