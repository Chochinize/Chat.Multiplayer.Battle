import React, { useEffect, useState, useRef } from 'react'
import { getPlayers } from '../../API_Call/apiCall'

const Room = () => {

  const [ player, setPlayer ] = useState<any>([])
  const effectRan = useRef(false)

  console.log(player.data?.players[0].users.map((player:any)=><li>{player}</li>))
  useEffect(() => {
    if(effectRan.current === false){
      const fetchPlayers =  async()=>{
        let players = await getPlayers()
        setPlayer(players)
      }
      fetchPlayers()
          return () => {
        effectRan.current = true
    }}
  }, [])


  return (
<div className="flex w-2 flex-wrap overflow ">
  
{/* {player.data?.players[0].users.map((player:any, i:any)=><li key={i} className='list-none text-xs mx-4' > user:{player}</li>)} */}
 
</div>
  )
}

export default Room