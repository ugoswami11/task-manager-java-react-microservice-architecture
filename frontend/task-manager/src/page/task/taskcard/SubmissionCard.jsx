import React from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { acceptDeclineSubmissions } from '../../../redux/SubmissionSlice';

const SubmissionCard = ({item}) => {

    const dispatch = useDispatch();

    const handleAcceptDecline=(status)=>{
        dispatch(acceptDeclineSubmissions({id:item.id,status}))
        // console.log(status)
    }

  return (
    <div className='rounded-md p-5 flex items-center justify-between'>
        <div className='space-y-2'>
            <div className='flex items-center gap-2'>
                <span>Github:</span>
                <div className='flex items-center gap-2 text-[#c24dd0]'>
                    <OpenInNewIcon/>
                    <a href={item.githubLink}>Go to Link</a>
                </div>
            </div>
            <div className='flex items-center gap-2 text-xs'>
                <p>Submission Time: </p>
                <p className='text-gray-400'>{item.submissionTime}</p>
            </div>
            {/* <div className='flex items-center gap-2 text-xs'>
                <p>Message: </p>
                <p className='text-gray-400'>{item.submissionTime}</p>
            </div> */}
        </div>
        <div>
            {
                item.status === "PENDING" ?
                <div className='flex gap-5'>
                    <div className='text-gray-500'>
                        <IconButton color='success' onClick={()=>handleAcceptDecline("ACCEPTED")}>
                            <CheckIcon/>
                        </IconButton>
                    </div>
                    <div className='text-red-500 '>
                        <IconButton color='error' onClick={()=>handleAcceptDecline("DECLINED")}>
                            <CloseIcon/>
                        </IconButton>
                    </div>

                </div>:
                <Button size='small' variant='outlined' color={ item.status==="ACCEPTED" ?"success":"error"}>
                    { item.status }
                </Button>
            }
        </div>
    </div>
  )
}

export default SubmissionCard