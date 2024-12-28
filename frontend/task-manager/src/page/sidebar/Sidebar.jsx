import React, { useState } from 'react'
import { Avatar, Button } from '@mui/material'
import "./Sidebar.css"
import CreateTask from '../task/CreateTask'
import {useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/AuthSlice'
import Notification from '../task/Notification'

const menu = [
    {name:"Home",value:"Home",role:["ROLE_ADMIN","ROLE_USER"]},
    {name:"Done",value:"DONE",role:["ROLE_ADMIN","ROLE_USER"]},
    {name:"Assigned",value:"ASSIGNED",role:["ROLE_ADMIN"]},
    {name:"Not Assigned",value:"PENDING",role:["ROLE_ADMIN"]},
    {name:"Create New Task",value:"",role:["ROLE_ADMIN"]},
    {name:"Notification",value:"NOTIFICATION",role:["ROLE_USER"]}
]


const Sidebar = () => {
    const dispatch = useDispatch();
    const {auth} = useSelector(store=>store);
    const role = auth.user.role;

    const location = useLocation();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("Home")
    const [openCreateTaskForm, setOpenCreateTaskForm] = React.useState(false)
    const [openNotification, setOpenNotification] = React.useState(false)
    
    const handleCloseCreateTaskForm = () =>{
        setOpenCreateTaskForm(false)
    }
    
    const handleOpenCreateTaskModal = () =>{
        setOpenCreateTaskForm(true)
    }

    const handleCloseNotification = () =>{
        setOpenNotification(false)
    }

    const handleOpenNotification = () =>{
        setOpenNotification(true)
    }
    
    const handleMenuChange = (item) => {
        const updatedParams = new URLSearchParams(location.search);

        if(item.name === "Create New Task"){
            updatedParams.delete("filter")
            const queryString = updatedParams.toString();
            const updatedPath = queryString?`${location.pathname}?${queryString}`:location.pathname;
            navigate(updatedPath);
            handleOpenCreateTaskModal()
        }
        else if(item.name === "Home"){
            updatedParams.delete("filter")
            const queryString = updatedParams.toString();
            const updatedPath = queryString?`${location.pathname}?${queryString}`:location.pathname;
            navigate(updatedPath);
        }
        else if(item.name === "Notification"){
            updatedParams.delete("filter")
            const queryString = updatedParams.toString();
            const updatedPath = queryString?`${location.pathname}?${queryString}`:location.pathname;
            navigate(updatedPath);
            handleOpenNotification()
        }
        else{
            updatedParams.set("filter", item.value);
            navigate(`${location.pathname}?${updatedParams.toString()}`)
        }


        setActiveMenu(item.name)
    }
    const handleLogout = () =>{
        dispatch(logout());
    }

    

  return (
    <>
        <div className='card min-h-[100vh] flex flex-col justify-center fixed w-[20vw]'>
            <div className='space-y-5 h-full'>
                <div className='flex justify-center'>
                    <Avatar 
                        sx={{width:"8rem", height:"8rem", backgroundColor:"#FF204E"}}
                        className='border-2 border-[white]'
                    >
                    </Avatar>
                </div>

                {
                
                    menu.filter((item)=>item.role.includes(role))
                    .map(item => 
                        <p onClick={()=>handleMenuChange(item)} className={`py-3 px-5 rounded-full text-center cursor-pointer ${activeMenu===item.name?"activeMenuItem":"menuItem"}`}>
                            {item.name}
                        </p>
                    )
                }  
                <Button onClick={handleLogout} sx={{padding:"0.7rem", borderRadius:"2rem"}} fullWidth className='logoutButton'>
                    Logout
                </Button>        

            </div>
        </div>
        <CreateTask open={openCreateTaskForm} handleClose={handleCloseCreateTaskForm}/>
        <Notification open={openNotification} handleClose={handleCloseNotification}/>

    </>
    
  )
  
}

export default Sidebar
