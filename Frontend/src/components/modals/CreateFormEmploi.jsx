import ANEPBtn from "../utils/ANEPBtn";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

function CreateFormEmploi(){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
        <ANEPBtn
                icon={"ic:baseline-plus"}
                name="Ajouter un nouveau module"
                onClick={handleOpen}
            />
        </>
    );
}
