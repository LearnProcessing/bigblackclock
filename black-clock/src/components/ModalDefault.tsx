import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ModalProps } from '../App/types';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'warning.main',
  border: '2px solid',
  boxShadow: 24,
  p: 4
};

export default function ModalUnstyledDefault(props: ModalProps) {
  const { type, open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
    if(type === 'TIMER') {
      if(props.stopSound !== undefined) {
        props.stopSound();
      }
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
      >
      <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" fontSize={40}>
            The Time Ended
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} fontSize={20}>
            Please click anywhere . . .
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
