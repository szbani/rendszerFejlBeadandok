import React, { useEffect, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

function DeadlineAlert({ message }) {
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleJumpToDeadline = () => {
        // Ide írd azt a logikát, amit szeretnél végrehajtani, amikor a felhasználó rákattint a gombra
        console.log('Ugrás a közelgő határidőhöz');
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleJumpToDeadline}>
                Megnéz
            </Button>
            <Button color="secondary" size="small" onClick={handleClose}>
                Bezár
            </Button>
        </React.Fragment>
    );

    useEffect(() => {
        if (message > 0) {
            setOpen(true);
        }
    }, [message]);

    return (
        <Snackbar
            open={open}
            autoHideDuration={15000}
            onClose={handleClose}
            message={message + " feladatodnak közeleg a határideje!"}
            action={action}
        />
    );
}

export default DeadlineAlert;
