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
    className='border-4 text-[20px]    w-full p-2  h-[100%] overflow-x-auto border-red-400 font-Dongle '>
      
    {client.chatPlayer?.map((item: any, index:number) =>
    <ul key={index} className='flex h-12 mb-2 items-center   border-2  border-teal-400 w-full break-words  '>
      <li className='ml-2 font-semibold'> {item?.name}</li>  
      <li className='font-semibold'> #</li>  
      <li className='font-norsemiboldmal mr-2'>{item?.id}</li>
      <li className='font-norsemiboldmal'> {moment().format('dddd')} </li> :
      <li className='ml-2 w-max  border-2 border-semibold '> {item?.chatMessage} </li> 
    </ul>
  )}
      
    </div>
  )
}
export default ShowArea

