import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch } from 'react-redux';
import { createTask } from '../../redux/TaskSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#00224D',
  border: '2px solid #FF204E',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  boxShadow: 'rgba(41, 26, 128, 0.507) 0px 0px 20px !important',
};

export default function Notification({handleClose,open}) {

  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          
        </Box>
      </Modal>
    </div>
  );
}