import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../state';
import { useNavigate } from "react-router-dom";
import { IUser, IFX } from '../interfaces/IUser'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux'
import { actionCreators, } from '../../state';
import RoomSettings from './RoomSettings';
import { getPlayers } from '../../API_Call/apiCall'
import { JoinRoom,LeaveRoom } from '../ActionRoom'




const MainRoom = () => {

  const paramsID = useParams().id;
  const compareID = useRef(false)
  const effectRan = useRef(false)

  const [msg, setMsg] = useState<any[]>([])
  const client = useSelector((state: State) => state.bank)
  const [userJoinned, setUserJoinned] = useState(false)
  const [user, setUser] = useState<IUser>({ name: '' })
  const [cookie, setCookies] = useCookies(['UID'])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { inviteUser, joinUser, playersJoinned } = bindActionCreators(actionCreators, dispatch)
  const [findName, setFindName] = useState<IFX>({ founded: '' })
  const [duplicateError, setDuplicateError] = useState(false)



  useEffect(() => {
    if (effectRan.current === false) {
      const fetchPlayers = async () => {
        let players = await getPlayers()

        playersJoinned(players)
      }
      fetchPlayers()
      return () => {
        effectRan.current = true
      }
    }
  }, [client, playersJoinned])


  useEffect(() => {

    if (client.users.length === 0) {
      // setMsg([])
      navigate('/', { replace: true })

    }


    client.users.onopen = () => {
      client.users.onmessage = (message: any) => {
        const dataFromServer = JSON.parse(message.data)

        // console.log('from server', dataFromServer)
        switch (dataFromServer.type) {
          case 'subscribe':
            setMsg(msg => [...msg, dataFromServer])
            console.log('datichka', dataFromServer)
            break;
          case 'unsubscribe':
            setMsg(msg => msg.filter(x => x.payload !== dataFromServer.payload && x.id !== dataFromServer.id))
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






  // const LeaveRoom = () => {
  //   setUserJoinned(false)
  //   setMsg(msg => msg.filter(x => x.payload !== user.name))
  //   client.users?.send(JSON.stringify({
  //     type: 'unsubscribeToChannel',
  //     name: user.name,
  //     id: paramsID
  //   }))
  // }
  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  useEffect(() => {
    if (effectRan.current === false) {
      const index = client.players.data?.players[0].users.find((findIndex: any) => findIndex.id === cookie.UID)

      return () => {
        effectRan.current = true
      }
    }


  }, [client.users])





  return (
    <div className='w-full h-full flex flex-col m-auto gap-5 text-2xl  font-Dongle   relative '>
      {client.users ? (<div className='w-max flex flex-col lg:flex-row m-auto gap-2  '>
        <input disabled={userJoinned ? true : false}
          type="text"
          name='name'
          value={user.name || findName?.founded}
          required
          placeholder='Ýour Name'
          className=" placeholder-shadow-xl outline-none text-center border-b-0 lg:border-b-2"
          onChange={onChangeInput}
        />

        {userJoinned
          ?
          <button
            onClick={() => LeaveRoom(user.name,paramsID,client,setUserJoinned(false),setMsg(msg => msg.filter(x => x.payload !== user.name)))}
            className='border-2   p-2 hover:bg-slate-50'>Leave Room</button>
          :
          <button
            disabled={user.name.length === 0 ? true : false}
            onClick={() => JoinRoom(user.name, paramsID, client, setUserJoinned(true))}
            className={`${user.name.length === 0 ? 'cursor-not-allowed' : ''} border-2 p-2 hover:bg-slate-100`}>Join Room</button>}
      </div>)
        :
        ''}
      <div>

        {duplicateError ? 'chppse new name' : ''}
      </div>
      {msg.some((e: any) => e.name === user.name) ? 'choose new user name' : ''}
      <h1 className='text-center text-[1.5hv] relative top-2 border-t-2  '>Main Room</h1>
      <div className=' relative h-[50vh] w-full overflow-x-auto p-4'>
        <div className='relative    top-10'>
          <RoomSettings />

          {msg.map((item: any, index) => <div className='list-none border-b-2 m-2 flex justify-between mx-4 ' key={index}>
            <ul className='flex items-center  m-2 ' >
              <li className=''>
                {item.payload}
              </li>
              <li className='ml-1'>
                #{item.id}
              </li>
            </ul>
            <li className='hover:bg-yellow-200 cursor-pointer rounded-full p-2' >
              invite player
            </li>
          </div>)}


        </div>
      </div>

    </div>
  )
}

export default MainRoom