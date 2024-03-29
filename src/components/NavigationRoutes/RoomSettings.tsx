import React, { useEffect,useRef } from 'react'
import { State } from '../../state';
import { useSelector } from 'react-redux'
import { BsChatDots } from 'react-icons/bs';
import { FcPlus } from 'react-icons/fc';

export const RoomSettings = () => {
    

 
    const client = useSelector((state: State) => state.bank)
    const effectRan = useRef(false)

  const sendInvitation = ()=>{
    console.log('LFN',client.players[0]?.data.players[0].users[1])
  }

    return (
    <div className=''>
       {client.players[0]?.data?.players[0].users.map((player: any, i: any) => <div key={i} className='list-none border-b-2 m-2 flex justify-between mx-4' >
            <ul className='flex items-center  m-2  '>
              <li>{player.name}</li>
              <li className='ml-1'>#{player.id}</li>
            </ul>
          
            <li className=' p-2 flex gap-4' >
            <FcPlus size={22} onClick={()=>sendInvitation()} className='cursor-pointer'/>
            <BsChatDots size={22} className=' cursor-pointer'/>
            </li>
          </div>)}

        
   
        
    </div>
  )
}

