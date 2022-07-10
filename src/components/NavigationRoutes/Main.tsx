import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../state';
import { useNavigate } from "react-router-dom";
import { IUser, IFX } from '../../interfaces/IUser'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux'
import { actionCreators, } from '../../state';
// import { RoomSettings } from './RoomSettings';
import { getPlayers } from '../../API_Call/apiCall'
// import { JoinRoom, LeaveRoom } from '../ActionRoom'
import { RoomSettings } from "./RoomSettings"
import { JoinRoom, LeaveRoom } from '../../RoomActions'
import ChatBox from './../ChatBox.tsx'




const MainRoom = () => {

  const paramsID = useParams().id;
  const compareID = useRef(false)
  const effectRan = useRef(false)


  const [msg, setMsg] = useState<any[]>([])
  const client = useSelector((state: State) => state.bank)
  const [cookie, setCookies] = useCookies(['UID'])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { playersJoinned, refreshPlayer, playerChat, userSetName,setUser } = bindActionCreators(actionCreators, dispatch)
  // const [findName, setFindName] = useState<IFX>({ founded: '' })




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
  }, [client.users])






  useEffect(() => {

    if (client.users.length === 0) {
      // setMsg([])
      navigate('/', { replace: true })

    }

    //                                  Info:                                   //
    //    In this component recive data from backend through websockets         //
    //    case:'subscribe'  subscribe to room and                               //
    //    case:'unsubscribe' unsubscribe and filter your name from the list     //
    //    case:'chatmsg' push msg to chatArr                                    //
    //                                                                          //
    //                                                                          //
    console.log(client)
    client.users.onopen = () => {
      // client.users.send(JSON.stringify({
      //   type:'ping',
        
      // }));
      client.users.onmessage = (message: any) => {
        console.log('message')
        const dataFromServer = JSON.parse(message.data)


        switch (dataFromServer.type) {
          case 'subscribe':
            setMsg(msg => [...msg, dataFromServer])
            console.log('datichka', dataFromServer)

            break;
          case 'unsubscribe':
            refreshPlayer(dataFromServer)
            setMsg(msg => msg.filter(x => x.payload !== dataFromServer.payload && x.id !== dataFromServer.id))

            console.log('dati', dataFromServer)
            break;
          case 'chatmsg':
            playerChat(dataFromServer)
            console.log('````````````````````CHAT MESSAGE', dataFromServer )
            break;
        }
      }
    }
    return ()=>{
      console.log('close connection')
      client.users.onclose = ()=>
      client.users?.send(JSON.stringify({
        type:'closeConnection',
        reason:'fall',
        id:'random',
      }))
    }

  }, [client.users])


  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    const target = e.target
    
    setUser(target);
  };


  useEffect(() => {
    if (effectRan.current === false) {
      const index = client.players.data?.players[0].users.find((findIndex: any) => findIndex.id === cookie.UID)

      return () => {
        effectRan.current = true
      }
    }
  }, [client.users])


  const setStateOnUserInput = (e: any) => {
    const { name } = e.target

    if (name === 'join') userSetName(true)
    if (name === 'leave') userSetName(false)


  }

  return (
    <div className='w-[100%] h-full flex justify-between  relative'>

      <div className='w-[30%] h-full flex flex-col  gap-5 text-2xl  font-Dongle    border-4 border-red-500 '>


        {client.users ? (<div className='w-max flex flex-col lg:flex-row m-auto gap-2  '>
          <input disabled={client.userJoinned ? true : false}
            type="text"
            name='name'
            value={client.setUserName.name }
            required
            placeholder='Ýour Name'
            className=" placeholder-shadow-xl outline-none text-center border-b-0 lg:border-b-2"
            onChange={(e)=>onChangeInput(e)}
          />

          {client.userJoinned
            ?
            <button
              name='leave'
              onClick={(e) => LeaveRoom(client.setUserName.name, paramsID, client, setStateOnUserInput(e), setMsg(msg => msg.filter(x => x.payload !== client.setUserName.name)))}
              className='border-2   p-2 hover:bg-slate-50'>Leave Room</button>
            :
            <button
              name='join'
              disabled={!client.setUserName.name  ? true : false}
              onClick={(e) => JoinRoom(client.setUserName.name, paramsID, client, setStateOnUserInput(e))}
              className={`${!client.setUserName.name  ? 'cursor-not-allowed' : ''} border-2 p-2 hover:bg-slate-100`}>Join Room</button>}
        </div>)
          :
          ''}
        <div>


        </div>

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
                {/* invite player */}
              </li>
            </div>)}

          </div>
        </div>

      </div>

      <div className='w-[30%]  border-2 border-red-500'>
        <ChatBox />
      </div>
    </div>
  )
}

export default MainRoom