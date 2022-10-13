import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
    main: `!absolute !top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] sm:!min-w-min sm:!max-w-[90%] !w-[90%] !bg-white !rounded !flex !flex-col !shadow p-4`
}

export default function ModalTemplate({open, handleClose, children}) {


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            onClick={(event) => event.stopPropagation()}
        >
            <Fade in={open}>
                <Box className={style.main} id={'modal'}>
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
}
