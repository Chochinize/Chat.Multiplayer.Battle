import React from 'react'
import Field from './Field'
import Menu from './Menu/Menu'
const Layout = () => {
  return (
    <div className='w-[40%] h-full border-2 relative'>
        <Menu/>
        <Field/>
 </div> 
  )
}

export default Layout