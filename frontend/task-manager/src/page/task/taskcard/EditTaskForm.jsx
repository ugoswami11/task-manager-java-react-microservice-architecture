import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTasksById, updateTask } from '../../../redux/TaskSlice';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

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

const tags=["Angular","React","Vuejs","Spring boot","Node js","Python"]

export default function EditTaskForm({item, handleClose, open}) {

  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId");
  const { task } = useSelector(store=>store);
  
   const [formData,setFormData] = React.useState({
        title:"",
        image:"",
        description:"",
        tags:[],
        deadline: new Date(),
   });

   const [selectedTags, setSelectedTags] = React.useState([]);

   const handleChange = (e) =>{
    const { name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
   };

   const handleTagsChange=(event, value)=>{
        setSelectedTags(value);
   }

   const handleDeadlineChange = (date) =>{
        setFormData({
          ...formData,
          deadline:date
        })
   }

   const formatDate = (input) =>{
      let{
        $y: year,
        $M: month,
        $D: day,
        $H: hours,
        $m: minutes,
        $s: seconds,
        $ms: milliseconds,
      } = input;

      const date = new Date(year,month,day,hours,minutes,seconds,milliseconds);

      const formattedDate = date.toISOString();

      return formattedDate;
   }

   const handleSubmit=(e)=>{
      e.preventDefault()
      const {deadline} = formData;
      formData.deadline = formatDate(deadline);
      formData.tags = selectedTags
      // console.log("formData",formData)
      dispatch(updateTask({id:taskId,updatedTaskData:formData}))
      handleClose()
   }

   useEffect(()=>{
      dispatch(fetchTasksById(taskId))
   },[taskId]);

   useEffect(()=>{
      if(task.taskDetails){
        setFormData(task.taskDetails)
        setSelectedTags(task.taskDetails.tags)
      }
   },[task.taskDetails])

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
            <Box container sx={{}}>
                <Box sx={{paddingBottom:'1rem'}}>
                    <TextField label="Title" fullWidth name='title' value={formData.title} onChange={handleChange}/>
                </Box>
                <Box sx={{paddingBottom:'1rem'}}>
                    <TextField label="Image" fullWidth name='image' value={formData.image} onChange={handleChange}/>
                </Box>
                <Box sx={{paddingBottom:'1rem'}}>
                    <TextField label="Description" fullWidth name='description' multiline rows={5} value={formData.description} onChange={handleChange}/>
                </Box>
                <Box sx={{paddingBottom:'1rem'}}>
                    <Autocomplete 
                      multiple 
                      id='multiple-limit-tags' 
                      options={tags} 
                      value={selectedTags}
                      onChange={handleTagsChange} 
                      getOptionLabel={(option)=>option} 
                      renderInput={
                        (params)=>(
                          <TextField label="Tags" fullwidth {...params}/>
                        )
                      }
                    />    
                </Box>
                <Box sx={{paddingBottom:'1rem'}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DateTimePicker onChange={handleDeadlineChange} value={dayjs(formData.deadline)} className='w-full' label="Deadline" renderInput={(params)=><TextField {...params}/>} />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <Button fullWidth type='submit' sx={{padding:".9rem", fontSize:'1rem', fontWeight:'600'}} className='customButton'>
                      Update
                  </Button>
                </Box>
            </Box>
          </form>
          
        </Box>
      </Modal>
    </div>
  );
}