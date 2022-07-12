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
import InvitePlayerModal from './../modals/inviteModal'







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
            console.log('last cookie',dataFromServer)  
            if (dataFromServer.userID === paramsID) {
              console.log('last cookie',dataFromServer)  
              InvitationModal(dataFromServer)
              console.log('last cookie',client)  
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


console.log('cl',client)

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


  const setStateOnUserInput = (e: any) => {
    const { name } = e.target

    if (name === 'join') userSetName(true)
    if (name === 'leave') userSetName(false)


  }


  

  return (
    <div className='w-[100%] h-full flex   relative'>

      <div className='w-[70%] h-full flex flex-col  gap-5 text-2xl  font-Dongle    border-4 border-red-700 '>

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
              <div key={indx} className='list-none border-2 border-b-2 m-2 flex justify-between mx-4 '>
                <ul className='flex items-center  m-2 ' >
                  <li className=''>
                    {item?.name}
                  </li>
                  <li className='ml-1'>
                    #{item?.id}
                  </li>
                  <li className='ml-1'>
                    {item?.status}
                  </li>
                </ul>

                {/*                                       LOADING ANIMATION                                         */}
                <li className='flex items-center gap-2  rounded-full  p-2 m-2' >
                  {/* {client.modalsInvitation.status === 'busy' ?  : '' } */}
                   {/* <div className="flex items-center justify-center space-x-[2px] ">
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-[wiggle1_2s_ease-in-out_infinite]"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-[wiggle2_2s_ease-in-out_infinite]"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-[wiggle3_2s_ease-in-out_infinite]"></div>
                  </div> */}
                  <RiSwordLine
                    size={22}
                    className='cursor-pointer text-blue-400 bg-black rounded-full p-1   '
                    onClick={(e) => sendInvitation(item.name, item.id, client, client.setUserName.name, paramsID,'busy')} />
                  {/* <BsChatDots size={22} className='cursor-pointer' /> */}
                </li>
              </div>
            )}
          </div>
        </div>

      </div>
      <InvitePlayerModal />
      <div className='w-full border-2 border-teal-200'>

      </div>
      <div className='w-[20vw] md:w-[35vw] lg:w-[35vw] xl:w-[20vw]  border-2 border-red-500'>
        <ChatBox />
      </div>
    </div>
  )
}

export default MainRoom