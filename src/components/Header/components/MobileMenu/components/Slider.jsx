import * as React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

const style = {
    main: `sm:!hidden !sticky`
}

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger} sx={{
            backgroundColor: '#2e1534'
        }}
        className={style.main}
        >
            {children}
        </Slide>
    );
}

export default HideOnScroll;
