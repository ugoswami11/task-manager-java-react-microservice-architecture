import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { submitTask } from '../../../redux/SubmissionSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#00224D',
  border: '2px solid #FF204E',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  boxShadow: 'rgba(41, 26, 128, 0.507) 0px 0px 20px !important',
};


export default function SubmitFormModal({item, handleClose, open}) {

  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId");
  const {task} = useSelector(store=>store);
  
   const [formData,setFormData] = React.useState({
        githubLink:"",
        description:"",
   });

    const handleChange = (e) =>{
    const { name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

   const handleSubmit=(e)=>{
      dispatch(submitTask({taskId:taskId,githubLink:formData.githubLink}))
      handleClose()
   }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form action="" onSubmit={handleSubmit}>
            <Box container >
                <Box sx={{paddingBottom:'1rem'}}>
                    <TextField label="Github Link" fullWidth name='githubLink' value={formData.githubLink} onChange={handleChange}/>
                </Box>
                <Box sx={{paddingBottom:'1rem'}}>
                    <TextField label="Description" fullWidth name='description' multiline rows={4} value={formData.description} onChange={handleChange}/>
                </Box>
                <Box>
                  <Button fullWidth type='submit' sx={{padding:".9rem"}} className='customButton'>
                      Submit
                  </Button>
                </Box>
            </Box>
          </form>
          
        </Box>
      </Modal>
    </div>
  );
}