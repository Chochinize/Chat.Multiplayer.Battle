import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../state';
import { useNavigate } from "react-router-dom";
import { IUser } from '../interfaces/IUser'




const MainRoom = () => {
  const [msg, setMsg] = useState<any[]>([])
  const amount = useSelector((state: State) => state.bank)
  const [userJoinned, setUserJoinned] = useState(false)
  const [user, setUser] = useState<IUser>({ name: '' })

  const navigate = useNavigate()
  useEffect(() => {
    if (amount.users.length == 0) {
      setMsg([])
      navigate('/', { replace: true })

    }
    amount.users.onopen = () => {
      amount.users.onmessage = (message: any) => {
        const dataFromServer = JSON.parse(message.data)
        switch (dataFromServer.type) {
          case 'subscribe':
            setMsg(msg => [...msg, dataFromServer.payload])
            console.log('datichka', dataFromServer)
            break;
          case 'unsubscribe':
            setMsg(msg => msg.filter(x => x !== dataFromServer.payload))
            console.log('dati', dataFromServer)
            break;
        }
      }
    }
    // return () => {
    //     client.close();
    //     console.log('Websocket close')
    // }
  }, [amount.users])

  const JoinRoom = () => {
    setUserJoinned(true)
    amount.users?.send(JSON.stringify({
      type: 'subscribeToChannel',
      name: user.name,
    }))
  };
  const LeaveRoom = () => {
    setUserJoinned(false)
    setMsg(msg => msg.filter(x => x !== user.name))
    amount.users?.send(JSON.stringify({
      type: 'unsubscribeToChannel',
      name: user.name,
    }))
  }
  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className='w-full h-full flex flex-col m-auto gap-5  text-xs  border-2 relative '>
      {amount.users ? (<div className='w-max flex flex-col lg:flex-row m-auto gap-2  '>
        <input disabled={userJoinned ? true : false}
          type="text"
          name="name"
          required
          placeholder="Your Name"
          className=" placeholder-shadow-xl outline-none text-center border-b-2"
          onChange={onChangeInput}
        />
        {userJoinned ? <button onClick={() => LeaveRoom()} className='border-2   p-2 hover:bg-slate-50'>Leave Room</button> : <button onClick={() => JoinRoom()} className='border-2 p-2 hover:bg-slate-50'>Join Room</button>}
      </div>) : ''}
      <div className=' relative h-[50vh] w-full overflow-x-auto'>
        <h1 className='text-center text-[1.5vw] relative top-2 '>Players</h1>
        <div className='relative border-2  top-10'>
          {amount.players.data?.players[0].users.map((player: any, i: any) => <div key={i} className='list-none border-b-2 m-2 flex justify-between mx-4' >
            <li className='flex items-center'>
              {player}
            </li>
            <li className='hover:bg-yellow-200 cursor-pointer rounded-full p-2'>
              invite player
            </li>
          </div>)}
          {msg.map((item: any, index) => <div className='list-none border-b-2 m-2 flex justify-between mx-4 ' key={index}>
            <li className='flex items-center'>
              {item}
            </li>
            <li className='hover:bg-yellow-200 cursor-pointer rounded-full p-2'>
              invite player
            </li>
          </div>)}
          


        </div>
      </div>

    </div>
  )
}

export default MainRoom