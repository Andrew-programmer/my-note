import React, {useEffect, useRef, useState} from 'react';
import Header from "../components/Header/Header";
import {Outlet} from "react-router";
import {
    checkListAndNoteLocation,
    createContexMenu,
    getParentUntilAttr
} from "../utlis/globalFunctions";
import OpenIconSpeedDial from "../components/components/SpeedTail/OpenIconSpeedDial";
import {observer} from "mobx-react-lite";




const Layout = observer(() => {
    const [coors, setCoors] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [contextMenuCode, setContextMenuCode] = useState(0);
    const [selectedID, setSelectedID] = useState(null)

    const searchState = useState('');
    // eslint-disable-next-line no-restricted-globals
    const [currentLocation, setLocation] = useState(location.href);

    const open = !!anchorEl;

    const params = {
        anchorEl,
        handleClose,
        open,
        setAnchorEl
    }

    const MainContextMenu = createContexMenu('main', params);
    const CardContextMenu = createContexMenu('card', params);
    const ListContextMenu = createContexMenu('list', params);



    function handleClose ()  {
        setAnchorEl(null);
    }

    const handleClick = async (event) => {
        // eslint-disable-next-line no-restricted-globals
        if(checkListAndNoteLocation(location.href)){
            event.preventDefault();
            if(open){
                handleClose();
                return;
            }

            const code = getParentUntilAttr(event.target, 'data-name');
            const id = getParentUntilAttr(event.target, 'data-id');
            setSelectedID(id);

            switch (code){
                case 'card':
                    await setContextMenuCode(1);
                    break;
                case 'list':
                    await setContextMenuCode(2)
                    break;
                default:
                    await setContextMenuCode(0)
                    await setCoors({
                        x: event.clientX,
                        y: event.clientY
                    })
                    await setAnchorEl(document.querySelector('.mainAnchor'));
                    return;
            }

            setAnchorEl(event.target);
        }
    };



    return (
        <>
            {/* eslint-disable-next-line no-restricted-globals */}
         <Header searchState={searchState} location={location.href}/>
            <main onContextMenu={handleClick} className={'w-full min-h-[90%] overflow-auto'} onMouseMove={(event) => {
                    // eslint-disable-next-line no-restricted-globals
                    setLocation(location.href);
            }} data-name='main'>
                <Outlet context={[searchState]}/>

                {contextMenuCode === 0 ? <MainContextMenu id={selectedID}/>: null}
                {/* eslint-disable-next-line no-restricted-globals */}
                {contextMenuCode === 1 ? <CardContextMenu id={selectedID}/>: null}
                {/* eslint-disable-next-line no-restricted-globals */}
                {contextMenuCode === 2 ? <ListContextMenu id={selectedID}/>: null}

                <div style={{
                    position: 'absolute',
                    left: coors.x - 5,
                    width: '10px',
                    height: '10px',
                    top: coors.y - 5
                }} className={'mainAnchor'}></div>
            </main>
        </>
    );

});

export default Layout;
