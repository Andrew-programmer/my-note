import React, {useEffect, useState} from 'react';
import {AppBar, Toolbar} from "@mui/material";
import {AiOutlineCaretRight} from "react-icons/ai";
import HideOnScroll from "./components/Slider";
import MobileMenu from "./components/MobileMenu";

import './styles.css'

const style = {
    toggleButton: `border-b border-violet-900 mx-2`
}

const getCurrentLocation = () => {
    // eslint-disable-next-line no-restricted-globals
    return location.href;
}

const getCurrentLocationLastPath = (loc) => {
    const arr = loc.split('/');
    return arr[arr.length - 1];
}

const setLocationName = (loc) => {
    const location = getCurrentLocationLastPath(loc);
    if(location.startsWith(':')){
        return 'My Note';
    } else {
        return location.toUpperCase();
    }
}


const MobileBar = ({searchState}) => {
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };



    return (
        <HideOnScroll>
            <AppBar>
                <Toolbar>
                    <button onClick={toggleDrawer('left', true)} className={style.toggleButton}>
                        <AiOutlineCaretRight />
                    </button>
                    {setLocationName(getCurrentLocation())}
                </Toolbar>
                <MobileMenu toggleDrawer={toggleDrawer} state={state} searchState={searchState}/>
            </AppBar>
        </HideOnScroll>
    );
};

export default MobileBar;
