import React, { useEffect, useRef } from 'react'
import { State } from '../../../state';
import { useSelector } from 'react-redux'


const ShowArea = () => {



  const client = useSelector((state: State) => state.bank)
  const effectRan = useRef(false)

  
  console.log('a client', client.chatPlayer)
  return (
    <div className='border-4 w-full p-2 h-[100%] border-red-400'>
      
    {client.chatPlayer?.map((item: any) =>
    <ul className='flex'>
      <li> {item.name} </li> #
      <li > {item.id} </li> :
      <li className='ml-2'> {item.chatMessage} </li> 
    </ul>
  )}
      
    </div>
  )
}
export default ShowArea

