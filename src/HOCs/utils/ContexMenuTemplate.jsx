import React from 'react';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

const ContexMenuTemplate = ({anchorEl, open, handleClose, menuItems}) => {

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}

        >
            {menuItems.map((item, index) => (
                <>
                    <MenuItem onClick={item[0]} key={index}>{item[1]}</MenuItem>
                    {item[1] === 'Delete' && menuItems.length !== 1 ?
                        <Divider variant={"middle"} sx={{
                            backgroundColor: '#919191'
                        }}/>
                        :
                        null
                    }
                </>

            ))}

        </Menu>
    );
};

export default ContexMenuTemplate;
