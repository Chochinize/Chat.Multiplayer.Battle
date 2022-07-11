import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../state';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux'
import { actionCreators, } from '../../state';
import { getPlayers } from '../../API_Call/apiCall'
import { JoinRoom, LeaveRoom, sendInvitation } from '../../RoomActions'
import ChatBox from './../ChatBox.tsx'
import { BsChatDots } from 'react-icons/bs';
import { FcPlus } from 'react-icons/fc';





const MainRoom = () => {

  const paramsID = useParams().id;
  const compareID = useRef(false)
  const effectRan = useRef(false)

  const [controversial, setControversial] = useState<any[]>([])
  const [msg, setMsg] = useState<any[]>([])
  const client = useSelector((state: State) => state.bank)
  const [cookie, setCookies] = useCookies(['UID'])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { playersJoinned, playerChat, userSetName, setUser, InvitationModal } = bindActionCreators(actionCreators, dispatch)



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


  // useEffect(() => {
  //   if (effectRan.current == false) {
  //     console.log('once run')
  //     const interval = setInterval(function ping() {
  //       client.users?.send(JSON.stringify({
  //         type: 'keepAlive',

  //       }))
  //     }, 25000)
  //   }
  //   return () => {
  //     effectRan.current = true
  //   }
  // }, [])



  console.log('lfn', client)
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
    client.users.onopen = () => {
      client.users.send(JSON.stringify({
        type: 'pushUsersBack',

      }));
      client.users.onmessage = (message: any) => {

        const dataFromServer = JSON.parse(message.data)


        switch (dataFromServer.type) {
          case 'subscribe':
            setMsg(msg => [...msg, dataFromServer])
            setControversial(controversial => [...controversial, dataFromServer])
            // console.log('datichka', dataFromServer)

            break;
          case 'unsubscribe':

            // console.log('what is los',dataFromServer)
            // refreshPlayer(dataFromServer)
            // setMsg(msg => msg.filter(x => x.payload !== dataFromServer.payload && x.id !== dataFromServer.id))
            setControversial(controversial => controversial.filter(x => x.name !== dataFromServer.name && x.id !== dataFromServer.id))

            // console.log('dati', dataFromServer)
            break;
          case 'chatmsg':
            playerChat(dataFromServer)
            // console.log('````````````````````CHAT MESSAGE', dataFromServer)
            break;
          case 'updateUserBox':

            setControversial(dataFromServer.usersUpdate.users)
            break;
          case 'sendInvitation':
            // console.log('last cookie',paramsID)  
            if (dataFromServer.userID === paramsID) {
              console.log('founded user', dataFromServer)
              console.log('founded user', client)
              InvitationModal(dataFromServer)
            }
            break;
        }
      }
    }
    return () => {
      // console.log('close connection')
      client.users.onclose = () =>
        client.users?.send(JSON.stringify({
          type: 'closeConnection',
          reason: 'fall',
          id: 'random',
        }))
    }

  }, [client.users])


  console.log('modals', client)

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


  // console.log('realdatafrom server', controversial.filter((item)=>item.id ))

  return (
    <div className='w-[100%] h-full flex   relative'>

      <div className='w-[30%] h-full flex flex-col  gap-5 text-2xl  font-Dongle    border-4 border-red-500 '>

        {client.users ? (<div className='w-max flex flex-col lg:flex-row m-auto gap-2  '>
          <input disabled={client.userJoinned ? true : false}
            type="text"
            name='name'
            value={client.setUserName.name}
            required
            placeholder='Ýour Name'
            className=" placeholder-shadow-xl outline-none text-center border-b-0 lg:border-b-2"
            onChange={(e) => onChangeInput(e)}
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
              disabled={!client.setUserName.name ? true : false}
              onClick={(e) => JoinRoom(client.setUserName.name, paramsID, client, setStateOnUserInput(e))}
              className={`${!client.setUserName.name ? 'cursor-not-allowed' : ''} border-2 p-2 hover:bg-slate-100`}>Join Room</button>}
        </div>)
          :
          ''}

        <h1 className='text-center text-[1.5hv] relative top-2 border-t-2  '>Main Room</h1>
        <div className=' relative h-[50vh] w-full overflow-x-auto p-4'>
          <div className='relative    top-10'>
            {/* <RoomSettings /> */}


            {controversial.map((item: any, indx) =>
              <div key={indx} className='list-none border-2 border-b-2 m-2 flex justify-between mx-4 '>
                <ul className='flex items-center  m-2 ' >
                  <li className=''>
                    {item?.name}
                  </li>
                  <li className='ml-1'>
                    #{item?.id}
                  </li>
                </ul>
                <li className='flex gap-4 border-2   rounded-full p-2' >
                  <FcPlus
                    size={22}
                    className='cursor-pointer'
                    onClick={(e) => sendInvitation(item.name, item.id, client, paramsID, client.setUserName.name)} />
                  <BsChatDots size={22} className='cursor-pointer' />
                </li>
              </div>
            )}
          </div>
        </div>

      </div>

      <div className='w-full border-2 border-teal-200'>
        dasdasds
      </div>
      <div className='w-[20vw] md:w-[35vw] lg:w-[35vw] xl:w-[20vw]  border-2 border-red-500'>
        <ChatBox />
      </div>
    </div>
  )
}

export default MainRoom