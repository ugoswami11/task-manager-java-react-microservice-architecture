import { Avatar } from '@mui/material'
import React from 'react'
import "./Navbar.css"
import { useSelector } from 'react-redux'


export const Navbar = () => {

  const {auth} = useSelector(store=>store)

  return (
    <div className='container z-10 sticky left-0 right-0 top-0 py-3 px-5 lg:px-10 flex justify-between items-center'>

        <p className='font-bold text-lg'>Task Manager</p>

        <div className='flex items-center gap-5'>
            <p>{auth.user?.fullname}</p>
            <Avatar sx={{backgroundColor:"#FF204E",color:"white"}} className='border-[white] border-2'>{auth.user?.fullname.charAt(0)}</Avatar>
        </div>

    </div>
  )
}
