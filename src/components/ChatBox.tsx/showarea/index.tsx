import React, { useEffect, useRef, useState } from 'react'
import { State } from '../../../state';
import { useSelector } from 'react-redux'


const ShowArea = () => {



  const client = useSelector((state: State) => state.bank)
  const effectRan = useRef(false)


  
  
  return (
    <div className='border-4  w-full p-2 h-[100%] overflow-x-auto border-red-500 font-Dongle '>
      
    {client.chatPlayer?.map((item: any, index:number) =>
    <ul key={index} className='flex items-center gap-[2px] border-2  border-teal-400 w-full break-words  '>
      <li className='font-black ml-2'> {item?.name}</li>  
      <li className='font-black'> #</li>  
      
      <li className='font-black'> {item?.id} </li> :
      <li className='ml-2 w-full  border-2 border-black'> {item?.chatMessage} </li> 
    </ul>
  )}
      
    </div>
  )
}
export default ShowArea

