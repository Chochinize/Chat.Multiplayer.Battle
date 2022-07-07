import React from 'react'
import { Outlet } from 'react-router-dom'
                                            
import Menu from './components/Menu/Menu'                                                                      
const Layout = () => {          
                                                                                                                                                                //            LEGEND:                                                       //
                                                                                                                                                                //      1.An <Outlet> should be used in parent route elements to            //
                                                                                                                                                                //      render their child route elements. This allows nested UI to show    //
                                                                                                                                                                //      up when child routes are rendered. If the parent route              //
                                                                                                                                                                //      matched exactly, it will render a child index route or nothing      //
                                                                                                                                                                //      if there is no index route. parent route elements to render         //
                                                                                                                                                                //      their child route elements.parent route elements to render their    //
                                                                                                                                                                //      child route elements.                                               //

  return (                                                                                                     

                                 
    <div className='w-[30%]  h-full border-r-[2px] border-black '>
      <Menu />
      <Outlet />
    </div>
  )
}

export default Layout