import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from "@mui/icons-material/Logout";


import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";
import Navigator, {checkListANoteAccountLocation, generatePhrase} from "../../../../../utlis/globalFunctions";
import SearchAppBar from "../../../../SearchInput/SearchInput";
import {useContext} from "react";
import {Context} from "../../../../../index";

const MobileMenu = ({toggleDrawer, state, searchState}) => {
    const navigate = useNavigate();
    const navigator = new Navigator(navigate);
    const {user} = useContext(Context);

    const date = new Date();
    const hours = date.getHours();

    const handleLogoutClick = () => {
        user.logout();
        navigator.navigateToAuthPage();
    }

    const list = () => (
            <Box
                role="presentation"
                onClick={toggleDrawer('left', false)}
                onKeyDown={toggleDrawer('left', false)}
            >
                <List>
                    <ListItem key={1} disablePadding>
                        <ListItemButton onClick={() => navigator.navigateToAccountPage()}>
                            <ListItemIcon>
                                <Avatar/>
                            </ListItemIcon>
                            <ListItemText primary={'Account'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={2} disablePadding>
                        <ListItemButton disabled={true}>
                            <ListItemText primary={generatePhrase(hours)}/>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider variant={"middle"} sx={{
                    backgroundColor: '#919191'
                }}/>
                <List>
                    {/* eslint-disable-next-line no-restricted-globals */}
                    {checkListANoteAccountLocation(location.href) ?
                        <ListItem key={3} disablePadding onClick={event => event.stopPropagation()}>
                            <SearchAppBar searchState={searchState}/>
                        </ListItem> : null
                    }
                    <ListItem key={4} disablePadding>
                        <ListItemButton onClick={() => navigator.navigateToNotesPage()}>
                            <ListItemIcon>
                                <TextSnippetIcon sx={{color: 'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary={'Notes'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={5} disablePadding>
                        <ListItemButton onClick={() => navigator.navigateToListsPage()}>
                            <ListItemIcon>
                                <FormatListBulletedIcon sx={{color: 'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary={'Lists'}/>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider variant={"middle"} sx={{
                    backgroundColor: '#919191'
                }}/>
                <List>
                    <ListItem key={6} disablePadding>
                        <ListItemButton onClick={() => navigator.navigateToSettingsPage()}>
                            <ListItemIcon>
                                <SettingsIcon sx={{color: 'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary={'Settings'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={7} disablePadding>
                        <ListItemButton onClick={handleLogoutClick}>
                            <ListItemIcon>
                                <LogoutIcon sx={{color: 'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary={'Log out'}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        )
    ;

    return (
        <div>
            <React.Fragment>
                <SwipeableDrawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}

                >
                    {list()}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default MobileMenu;
