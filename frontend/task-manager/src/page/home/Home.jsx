import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import TaskList from '../tasklist/TaskList'


const Home = () => {
  return (
    // px-5 lg:px-20 pt-[2.9vh]
    <div className='lg:flex h-full w-full'>
        <div className='hidden lg:block w-[25vw] relative '>
            <Sidebar/>
        </div>
        <div className='right-sidebar w-full flex justify-end mb-10'>
          <TaskList/>
        </div>
    </div>
  )
}

export default Home