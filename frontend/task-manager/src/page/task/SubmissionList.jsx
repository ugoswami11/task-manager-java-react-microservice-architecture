import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SubmissionCard from './taskcard/SubmissionCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSubmissionsByTaskId } from '../../redux/SubmissionSlice';
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

const submissions = [1,1,1]

export default function SubmissionList({handleClose,open}) {
  
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId");
  const {submission} = useSelector(store=>store);

  useEffect(()=>{
    if(taskId){
      // console.log("This is inside useEffect for fetchSubmissionsBytaskId");
      dispatch(fetchSubmissionsByTaskId(taskId));
    }
  },[taskId])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {submission.submissions.length>0?
            <div className='space-y-2'>
              {submission.submissions.map((item) => <SubmissionCard item={item}/>)}
            </div>
            :
            <div className=''>
              <div className='text-center'>
                No submission found
              </div>
            </div>
          }
          </div>
          
        </Box>
      </Modal>
    </div>
  );
}