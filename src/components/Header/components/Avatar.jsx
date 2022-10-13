import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from "./Logo";
import {useNavigate} from "react-router-dom";
import Navigator, {generatePhrase} from "../../../utlis/globalFunctions";
import {useContext} from "react";
import {Context} from "../../../index";
import {getPhotoUrl} from "../../../urls/userUrls";

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {user} = useContext(Context);

    const navigate = useNavigate();
    const navigator = new Navigator(navigate);

    const open = Boolean(anchorEl);

    const today = new Date();
    const hours = today.getHours();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        user.logout();
        navigator.navigateToAuthPage();
    }

    return (
        [
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }} src={getPhotoUrl(user.photo)}/>
                        <Logo/>
                    </IconButton>
                </Tooltip>
            </Box>,
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            left: 20,
                            backgroundColor: '#2e1534',
                            width: 10,
                            height: 10,
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem disabled={true}>
                    {generatePhrase(hours)}
                </MenuItem>
                <Divider variant={"middle"} sx={{
                    backgroundColor: '#919191'
                }}/>
                <MenuItem onClick={() => navigate('/home/settings')}>
                    <ListItemIcon>
                        <SettingsIcon fontSize='small' sx={{color: 'white'}}/>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" sx={{color: 'white'}}/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        ]
    );
}

export default AccountMenu;
