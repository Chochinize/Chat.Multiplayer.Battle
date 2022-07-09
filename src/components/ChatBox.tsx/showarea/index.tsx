import React, { useEffect, useRef, useState } from 'react'
import { State } from '../../../state';
import { useSelector } from 'react-redux'


const ShowArea = () => {



  const client = useSelector((state: State) => state.bank)
  const effectRan = useRef(false)


  
  
  return (
    <div className='border-4 w-full p-2 h-[100%] border-red-400 '>
      
    {client.chatPlayer?.map((item: any, index:number) =>
    <ul key={index} className='flex border-2 border-teal-600 w-full break-words  '>
      <li> {item?.name} </li> #
      <li > {item?.id} </li> :
      <li className='ml-2 w-full border-2 border-black'> {item?.chatMessage} </li> 
    </ul>
  )}
      
    </div>
  )
}
export default ShowArea

