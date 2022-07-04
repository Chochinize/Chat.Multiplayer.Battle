import React from 'react'
import { Outlet } from 'react-router-dom'
import Menu from './Menu/Menu'
const Layout = () => {
  return (
    <div className='w-[40%]  h-full border-2 '>
        <Menu/>
        <Outlet/>
 </div> 
  )
}

export default Layout