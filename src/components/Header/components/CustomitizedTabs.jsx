import * as React from 'react';
import {styled} from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {Link, NavLink, useNavigate} from "react-router-dom";
import Navigator, {checkListANoteAccountLocation} from "../../../utlis/globalFunctions";
import {useEffect, useState} from "react";
import {Badge} from "@mui/material";


const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{children: <span className="MuiTabs-indicatorSpan"/>}}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
    },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({theme}) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        color: 'rgba(255, 255, 255, 0.7)',
        '&.Mui-selected': {
            color: '#fff',
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
    }),
);

export default function CustomizedTabs() {

    const hideElement = (element) => {
        element.style.display = 'none';
    }
    const showElement = (element) => {
        element.style.display = 'flex';
    }

    const [value, setValue] = useState(0);

    const navigate = useNavigate();
    const navigator = new Navigator(navigate);

    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        if (!checkListANoteAccountLocation(location.href)) {
            hideElement(document.querySelector('.MuiTabs-indicator'))
            setValue(null);
        } else {
            showElement(document.querySelector('.MuiTabs-indicator'))
        }
        // eslint-disable-next-line no-restricted-globals
    }, [location.href])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigator.navigateToNotesPage()
                break;
            case 1:
                navigator.navigateToListsPage()
                break;
            case 2:
                navigator.navigateToAccountPage()
                break;
            default:
                navigate('*');
        }
    };

    return (
        <Box>
            <StyledTabs
                value={value}
                onChange={handleChange}
                aria-label="styled tabs example"
            >
                <StyledTab label="Notes"/>
                <StyledTab label="Lists"/>
                <StyledTab label="Account"/>
            </StyledTabs>
        </Box>
    );
}
