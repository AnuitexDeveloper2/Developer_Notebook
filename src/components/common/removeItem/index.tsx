import { Box, Button, Typography } from '@mui/material';
import React, { FC } from 'react';

import "./index.css"

interface Props {
    closeModal: () => void;
    removeUser: () => Promise<void> | void;
    mainText: string;
    minorText: string;
}

const RemoveItem: FC<Props> = ({closeModal, removeUser ,mainText, minorText}) => {
    return (
        <>
            <Box padding={{ sm: "0", md: "2em" }}>
                <Box display="flex" justifyContent="center" textAlign="center">
                    <Typography variant="h4" gutterBottom >
                        Are you sure you want to remove {mainText}?
               </Typography>
                </Box>
                <Box display="flex" justifyContent="center" padding="2em" textAlign="center">
                    <Typography variant="h6" className="base-color">
                        {minorText}
                </Typography>
                </Box>
                <Box display="flex" justifyContent="space-evenly" >
                    <Button className="user-remove-button user-modal-buttons" onClick={removeUser}>Remove</Button>
                    <Button className="user-cancel-button user-modal-buttons" onClick={closeModal}>Cancel</Button>
                </Box>
            </Box>
        </>
    )
}

export default RemoveItem