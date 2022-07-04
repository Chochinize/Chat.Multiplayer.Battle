import React from 'react'
import { Outlet } from 'react-router-dom'
import Menu from './Menu/Menu'
const Layout = () => {
  return (
    <div className='w-[30%]  h-full border-r-[2px] border-black '>
        <Menu/>
        <Outlet/>
 </div> 
  )
}

export default Layout