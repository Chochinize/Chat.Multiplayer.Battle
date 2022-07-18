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
import { RiSwordLine } from 'react-icons/ri';
import { FcSettings } from 'react-icons/fc';
import InvitePlayerModal from './../modals/inviteModal'
import Canvas from '../GameRoom/Canvas';







const MainRoom = () => {

  const paramsID = useParams().id;
  const compareID = useRef(false)
  const effectRan = useRef(false)

  const [controversial, setControversial] = useState<any[]>([])

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

  //   useEffect(() => {
  //   if (effectRan.current == false) {
  //     console.log('modals changes')
  //   }
  //   return () => {
  //     effectRan.current = true
  //   }
  // }, [client.modalsInvitation])





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
            client.users.send(JSON.stringify({
              type: 'pushUsersBack',
            }));
            setControversial(controversial => [...controversial, dataFromServer])
            break;
          case 'unsubscribe':
            setControversial(controversial => controversial.filter(x => x.name !== dataFromServer.name && x.id !== dataFromServer.id))
            break;
          case 'chatmsg':
            playerChat(dataFromServer)
            break;
          case 'updateUserBox':
            setControversial(dataFromServer.usersUpdate.users)
            break;
          case 'sendInvitation':
            if (dataFromServer.userID === paramsID) {
              client.users.send(JSON.stringify({
                type: 'pushUsersBack',
              }));
              console.log('join on accept', dataFromServer)
              InvitationModal(dataFromServer)
            }
            break;
          case 'cancelInvitationResend':

            if (dataFromServer.userID === paramsID) {
              client.users.send(JSON.stringify({
                type: 'pushUsersBack',
              }));
              InvitationModal({ status: dataFromServer.status })
            }
            break;
          case 'acceptGameInvitation':
            InvitationModal(dataFromServer)
            const { userID, status, roomID } = dataFromServer
            if (userID === paramsID) {
              navigate(`/manroom/${dataFromServer.userID}/${dataFromServer.roomID}`, { replace:true})
              if(status === 'playing'){
                navigate(`/mainroom/${userID}/${roomID}`, { replace:true})
                console.log(dataFromServer)
             }
            }
            break;
        }
      }
    }
    return () => {
      client.users.onclose = () =>
        client.users?.send(JSON.stringify({
          type: 'closeConnection',
          reason: 'fall',
          id: 'random',
        }))
    }

  }, [client.users])


  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    const target = e.target

    setUser(target);
  };


  // useEffect(() => {
  //   if (effectRan.current === false) {
  //     const index = client.players.data?.players[0].users.find((findIndex: any) => findIndex.id === cookie.UID)

  //     return () => {
  //       effectRan.current = true
  //     }
  //   }
  // }, [client.users])



   useEffect(() => {
    console.log('see what is in client',client)
    const { senderID, status, roomID,userID } = client.modalsInvitation
    if(paramsID === senderID && status === 'playing'){
      navigate(`/mainroom/${senderID}/${roomID}`)
    }
    console.log('wwow',senderID)
    console.log('wwow',status)
    console.log('wwow',roomID)
     
  }, [client.modalsInvitation.status])

  const setStateOnUserInput = (e: any) => {
    const { name } = e.target

    if (name === 'join') userSetName(true)
    if (name === 'leave') userSetName(false)


  }



  return (
    <div className='w-[100%] h-full flex   relative'>

      <div className='w-[70%] h-full flex flex-col  gap-5 text-2xl  font-Dongle    border-2 border-red-700 '>

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
              onClick={(e) => LeaveRoom(client.setUserName.name, paramsID, client, setStateOnUserInput(e))}
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
              <div key={indx} className='list-none border-[1px]   border-black m-2 w-52 flex justify-between mx-4 '>
                <ul className='flex items-center m-4' >
                  <li>{item?.name}</li>
                  <li>#{item?.id}</li>
                </ul>

                <div className='flex items-center gap-2  rounded-full  p-2 m-2  ' >
                  {item.status === 'busy' ? <div className="flex h-4 items-center space-x-[2px]  has-tooltip ">

                    <span className='tooltip rounded-tl-full  rounded-tr-full h-8 rounded-bl-full  bg-black shadow-xl right-24 -top-1 -m-4 px-2 w-max    text-white text-[16px] '>This player is in queue</span>


                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-[wiggle1_2s_ease-in-out_infinite]"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-[wiggle2_2s_ease-in-out_infinite]"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-[wiggle3_2s_ease-in-out_infinite]"></div>
                  </div> : ''}

                  {item?.id === paramsID ?
                    <FcSettings
                      size={22}
                    />
                    :
                    <RiSwordLine
                      size={22}
                      className={`${item.status === 'busy' ? 'cursor-wait' : 'cursor-pointer'} text-blue-400 bg-black rounded-full p-1 z-2  `}
                      onClick={(e) => sendInvitation(item.name, item.id, client, client.setUserName.name, paramsID, 'busy')}
                    />}



                </div>


              </div>
            )}
          </div>
        </div>

      </div>
      <InvitePlayerModal />
      <div className='w-full h-full border-2 border-teal-200'>
        {/* <Canvas/> */}
      </div>
      <div className='w-[20vw] md:w-[35vw] lg:w-[35vw] xl:w-[20vw]  border-2 border-red-500'>
        <ChatBox />
      </div>
    </div>
  )
}

export default MainRoom
