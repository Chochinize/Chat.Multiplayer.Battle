import React, { useEffect,useRef } from 'react'
import { State } from '../../state';
import { useSelector } from 'react-redux'
const RoomSettings = () => {
    

 
    const client = useSelector((state: State) => state.bank)
    const effectRan = useRef(false)

    useEffect(() => {
        console.log(client.users)
    },[])

    return (
    <>
       {client.players.data?.players[0].users.map((player: any, i: any) => <div key={i} className='list-none border-b-2 m-2 flex justify-between mx-4' >
            <ul className='flex items-center  m-2  '>
              <li>{player.name}</li>
              <li className='ml-1'>#{player.id}</li>
            </ul>
          
            <li className='hover:bg-yellow-200 cursor-pointer rounded-full p-2' >
              invite player
            </li>
          </div>)}

        
   
        
    </>
  )
}

export default RoomSettings