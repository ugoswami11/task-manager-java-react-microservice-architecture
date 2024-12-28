import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserList } from '../../redux/AuthSlice';
import { assignedTaskToUser, fetchAllTasksByUserId, fetchTasksById } from '../../redux/TaskSlice';
import { useLocation } from 'react-router-dom';

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

export default function UserList({handleClose,open}) {
  
  const dispatch = useDispatch();
  const { auth, task } = useSelector(store=>store);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId");

  useEffect(()=>{
    if(taskId)dispatch(fetchTasksById(taskId))
  },[taskId]);

  // const taskDetails = dispatch(fetchTasksById({taskId}));


  useEffect((item)=>{
    dispatch(getUserList(localStorage.getItem("jwt")))
  },[])

  const handleAssignTask = (user) => {
    dispatch(assignedTaskToUser({userId:user.id, taskId:taskId}));
    handleClose();
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
          {
            auth.users.map((item,index)=>
              <>
                <div className='flex items-center justify-between w-full px-2'>
                  <div>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png"/>
                      </ListItemAvatar>
                      <ListItemText primary={item.fullname} secondary={`@${item.fullname.split(" ").join("_").toLowerCase()}`}/>
                    </ListItem>
                  </div>

                  {
                     task.taskDetails?.assignedUserId===item.id ? ( 
                      <div>
                        <Button disabled className='customButton'>Assigned</Button>
                      </div>
                    ) : (
                      <div>
                        <Button onClick={()=>handleAssignTask(item)} className='customButton' >Assign</Button>
                      </div>
                  )}
                  
                </div>
                {index!==auth.users.length-1 && <Divider variant='inset'/>}                
              </>
            )
          }
          
        </Box>
      </Modal>
    </div>
  );
}