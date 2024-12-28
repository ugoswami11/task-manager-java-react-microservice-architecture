import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/AuthSlice';
import './Auth.css'


const Signup = ({togglePanel}) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        fullname:"",
        email:"",
        password:"",
        role: "",
    })

    const handleChange =(e) =>{
        const {name, value} = e.target;
        setFormData({...formData,[name]:value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(register(formData));
        console.log("login form", formData)
    }

  return (
    <div>
        <h1 className='text-lg font-bold text-center pb-8'>Register</h1>
        <form className='space-y-3' onSubmit={handleSubmit}>
            <TextField fullWidth label="Fullname" name='fullname' type='text' value={formData.fullname} onChange={handleChange} placeholder='enter your fullname...'/>
            <TextField fullWidth label="Email" name='email' type='email' value={formData.email} onChange={handleChange} placeholder='enter your email...'/>
            <TextField fullWidth label="Password" name='password' type='password' value={formData.password} onChange={handleChange} placeholder='enter your password...'/>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.role}
                label="Role"
                name='role'
                onChange={handleChange}
                >
                    <MenuItem value={"ROLE_USER"}>User</MenuItem>
                    <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem> 
                </Select>
            </FormControl>
            <div>
                <Button fullWidth className='authButton' type='submit' sx={{padding:"0.9rem"}}>
                    Register
                </Button>
            </div>
        </form>
        <div className='mt-5 flex items-center gap-2 py-5 justify-center'>
            <span>Already have account?</span>
            <Button className='textStyle' onClick={togglePanel}>Signin</Button>
        </div>
    </div>
  )
}

export default Signup