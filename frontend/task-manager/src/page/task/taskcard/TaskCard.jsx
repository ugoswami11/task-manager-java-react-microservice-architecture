import React, { useState } from 'react'
import './TaskCard.css'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserList from '../UserList';
import SubmissionList from '../SubmissionList';
import EditTaskForm from './EditTaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../../redux/TaskSlice';
import { useLocation, useNavigate, useSubmit } from 'react-router-dom';
import SubmitFormModal from './SubmitFormModal';


const TaskCard = ({item}) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const {auth} = useSelector(store => store);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const [openUserList, setOpenUserList] = useState(false);
    const handleOpenUserList = () =>{
        const updatedParams = new URLSearchParams(location.search)
        updatedParams.set("taskId", item.id);
        navigate(`${location.pathname}?${updatedParams.toString()}`)
        setOpenUserList(true);
        handleMenuClose()
    }
    const handleCloseUserList = () => { 
        setOpenUserList(false);
        handleRemoveTaskIdParams();
    }

    const [openSubmissionList, setOpenSubmissionList] = useState(false);
    const handleOpenSubmissionList = () =>{
        const updatedParams = new URLSearchParams(location.search)
        updatedParams.set("taskId", item.id);
        navigate(`${location.pathname}?${updatedParams.toString()}`)
        setOpenSubmissionList(true);
        handleMenuClose()        
    }
    const handleCloseSubmissionList = () => {
        setOpenSubmissionList(false);
        handleRemoveTaskIdParams();
    }

    const [openEditTaskModal, setOpenEditTaskModal] = useState(false);
    const handleOpenUpdateTaskModal = () =>{
        const updatedParams = new URLSearchParams(location.search)
        updatedParams.set("taskId", item.id);
        navigate(`${location.pathname}?${updatedParams.toString()}`)
        setOpenEditTaskModal(true);
        handleMenuClose()
    }
    const handleCloseEditTaskModal = () => {
        setOpenEditTaskModal(false);
        handleRemoveTaskIdParams();
    }

    const [openSubmitFormModal, setOpenSubmitFormModal] = useState(false);
    const handleOpenSubmitFormModal = () => {
        const updatedParams = new URLSearchParams(location.search)
        updatedParams.set("taskId", item.id);
        navigate(`${location.pathname}?${updatedParams.toString()}`)
        setOpenSubmitFormModal(true);
        handleMenuClose() 
    }
    const handleCloseSubmitFormModal = () => {
        setOpenSubmitFormModal(false);
        handleRemoveTaskIdParams();
    }

    const handleRemoveTaskIdParams = () =>{
        const updatedParams = new URLSearchParams(location.search)
        updatedParams.delete("taskId")
        const queryString = updatedParams.toString();
        const updatedPath = queryString?`${location.pathname}?${queryString}`:location.pathname;
        navigate(updatedPath);
    }

    const handleDeleteTask = () =>{
        dispatch(deleteTask(item.id))
        handleMenuClose()
    }

  return (
    <div>
        <div className='card lg:flex justify-between'>
            <div className='lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]'>
                <div className='lg:w-[12rem] lg:h-[10rem] w-[12rem] h-[10rem] overflow-hidden'>
                    <img className='w-full h-full object-cover' src={item.image} alt="" srcset="" />
                </div>
                <div className='space-y-5'>
                    <div className='space-y-2'>
                        <h1 className='font-bold text-lg'>{item.title}</h1>
                        <p className='text-gray-500 text-sm'>{item.description}</p>
                    </div>
                    <div className='flex flex-wrap gap-2 items-center'>
                        {item.tags.map((item)=> <span className='py-1 px-5 rounded-full techstack'>{item}</span>)}
                    </div>
                </div>
            </div> 

            <div>
                <IconButton
                    id="basic-button"
                    aria-controls={openMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleMenuClick}
                >
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    
                    {
                        auth.user?.role==="ROLE_ADMIN"?(
                        <>
                            <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
                            <MenuItem onClick={handleOpenSubmissionList}>See Submissions</MenuItem>
                            <MenuItem onClick={handleOpenUpdateTaskModal}>Edit</MenuItem>
                            <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
                        </>
                        ):(
                        <>
                            <MenuItem onClick={handleOpenSubmitFormModal}>Submit</MenuItem>
                        </>
                        )
                    }
                </Menu>
            </div>
        </div>
        <UserList open={openUserList} handleClose={handleCloseUserList}/>
        <SubmissionList open={openSubmissionList} handleClose={handleCloseSubmissionList}/>
        <EditTaskForm item={item} open={openEditTaskModal} handleClose={handleCloseEditTaskModal}/>
        <SubmitFormModal open={openSubmitFormModal} handleClose={handleCloseSubmitFormModal}/>
    </div>
  )
}

export default TaskCard