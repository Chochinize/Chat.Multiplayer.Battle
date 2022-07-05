import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../state';
import { useNavigate } from "react-router-dom";
import { IUser } from '../interfaces/IUser'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux'
import { actionCreators, } from '../../state';
import axios from 'axios'




const MainRoom = () => {

  const paramsID = useParams().id;
  const compareID = useRef(false)
  const [msg, setMsg] = useState<any[]>([])
  const client = useSelector((state: State) => state.bank)
  const [userJoinned, setUserJoinned] = useState(false)
  const [user, setUser] = useState<IUser>({ name: '' })
  const [cookie, setCookies] = useCookies(['UID'])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { join, playersJoinned } = bindActionCreators(actionCreators, dispatch)



  //   useEffect(() => {
  //     if (compareID.current === false) {
  //         const fetchPlayers = async () => {
  //             let playersID = await axios.get('/getPlayers')
  //             console.log('compare ID',playersID)

  //         }
  //         fetchPlayers()
  //         return () => {
  //           compareID.current = true
  //         }
  //     }
  // }, [])


  useEffect(() => {
    console.log('run once')
    const fetchPlayers = async () => {
      let playersID = await axios.get('/getPlayers')
      console.log('compare ID', playersID.data.players[0].users[0].id)
    

    }
    fetchPlayers()

  }, [userJoinned])
  console.log(userJoinned)

  useEffect(() => {
    if (client.users.length == 0) {
      setMsg([])
      navigate('/', { replace: true })

    }
    client.users.onopen = () => {
      client.users.onmessage = (message: any) => {
        const dataFromServer = JSON.parse(message.data)

        console.log('from server', dataFromServer)
        switch (dataFromServer.type) {
          case 'subscribe':
            setMsg(msg => [...msg, dataFromServer])
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
  }, [client.users])
  const JoinRoom = () => {
    setUserJoinned(true)
    client.users?.send(JSON.stringify({
      type: 'subscribeToChannel',
      name: user.name,
      id: paramsID
    }))
  };

  const LeaveRoom = () => {
    setUserJoinned(false)
    setMsg(msg => msg.filter(x => x !== user.name))
    client.users?.send(JSON.stringify({
      type: 'unsubscribeToChannel',
      name: user.name,
    }))
  }
  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };



  return (
    <div className='w-full h-full flex flex-col m-auto gap-5 text-2xl  font-Dongle   relative '>
      {client.users ? (<div className='w-max flex flex-col lg:flex-row m-auto gap-2  '>
        <input disabled={userJoinned ? true : false}
          type="text"
          name="name"
          required
          placeholder="Your Name"
          className=" placeholder-shadow-xl outline-none text-center border-b-0 lg:border-b-2"
          onChange={onChangeInput}
        />
        {userJoinned
          ?
          <button onClick={() => LeaveRoom()} className='border-2   p-2 hover:bg-slate-50'>Leave Room</button>
          :
          <button onClick={() => JoinRoom()} className='border-2 p-2 hover:bg-slate-50'>Join Room</button>}
      </div>)
        :
        ''}
      <h1 className='text-center text-[1.5hv] relative top-2 border-t-2  '>Main Room</h1>
      <div className=' relative h-[50vh] w-full overflow-x-auto p-4'>
        <div className='relative    top-10'>
          {client.players.data?.players[0].users.map((player: any, i: any) => <div key={i} className='list-none border-b-2 m-2 flex justify-between mx-4' >
            <ul className='flex items-center  m-2  '>
              <li>{player.name}</li>
              <li className='ml-1'>#{player.id}</li>
              
              
            </ul>
            <li className='hover:bg-yellow-200 cursor-pointer rounded-full p-2'>
              invite player
            </li>
          </div>)}
          {msg.map((item: any, index) => <div className='list-none border-b-2 m-2 flex justify-between mx-4 ' key={index}>
            <ul className='flex items-center  m-2 '>
              <li className=''>
                {item.payload}
              </li>
              <li className='ml-1'> 
              #{item.id}
              </li>
            </ul>
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