import React, { useEffect, useRef, useState } from 'react'
import { State } from '../../../state';
import { useSelector } from 'react-redux'
import moment from 'moment'


const ShowArea = () => {

  const el = useRef<null | HTMLDivElement>(null); 

  const client = useSelector((state: State) => state.bank)
  const effectRan = useRef(false)

  const [messages, setMessages] = useState([]);


  useEffect(() => {
      if (el.current === null) { }
      else
          el!.current!.scrollIntoView({ block: 'end', behavior: 'smooth' });
  
      
  
  }, [])
  
  return (
    <div 
    ref={el}
    className='text-[20px]    w-full   h-[100%] overflow-x-auto  font-Dongle '>
      
    {client.chatPlayer?.map((item: any, index:number) =>
    <ul key={index} className='flex h-8  items-center   w-full break-words  '>
      <li className='ml-2 font-semibold'> {item?.name}</li>  
      <li className='font-semibold'> #</li>  
      <li className='font-semibold'>{item?.id}</li>
      <li className='font-norsemiboldmal'> {} </li> :
      <li className='ml-2 w-max    '> {item?.chatMessage} </li> 
    </ul>
  )}
      
    </div>
  )
}
export default ShowArea

