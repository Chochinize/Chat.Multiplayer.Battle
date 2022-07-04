import React, { useEffect, useState, useRef, useId } from 'react'
import { w3cwebsocket as ws } from 'websocket'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';
import { getPlayers } from '../../API_Call/apiCall'
import { useCookies } from 'react-cookie'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';





interface Isocket {
    onopen: (arg: any) => any;
    onmessage: (arg: any) => any
    close: () => void;
    send: (arg: string) => any
}


const Menu = () => {

    
    
    
    const dispatch = useDispatch()
    const { depositMoney, withDraw, bankrupt, join, playersJoinned } = bindActionCreators(actionCreators, dispatch)
    // const [user, setUser] = useState<IUser>({ name: '' })
    // const [cookies, setCookie] = useCookies([user.name]);
    // const [userJoinned, setUserJoinned] = useState(false)
    const [client, setClient] = useState<Isocket | null>()
    let navigate = useNavigate();
    // const [player, setPlayer] = useState<any>([])
    const effectRan = useRef(false)

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
    }, [client])
   
    

  
    

    // useEffect(() => {
    //     if (!client) {
    //         return setMsg([])

    //     }
    //     client.onopen = () => {
    //         client.onmessage = (message) => {
    //             const dataFromServer = JSON.parse(message.data)
    //             switch (dataFromServer.type) {
    //                 case 'subscribe':
    //                     setMsg(msg => [...msg, dataFromServer.payload])
    //                     console.log('datichka', dataFromServer)
    //                     break;
    //                 case 'unsubscribe':
    //                     setMsg(msg => msg.filter(x => x !== dataFromServer.payload))
    //                     console.log('dati', dataFromServer)

    //                     break
    //             }
    //         }
    //     }
    //     // return () => {
    //     //     client.close();
    //     //     console.log('Websocket close')
    //     // }
    // }, [client])




    const wConnect = () => {
        const frontclient = new ws('ws://localhost:5050'); //  Initialize  the client
       navigate('/mainroom',{replace:true})
        join(frontclient)
        setClient(frontclient)
        console.log('you are connectet')
        console.log('status',)
       
    }

    // const wDisconnect = () => {
    //     client && client.close()
    //     setUserJoinned(false)
    //     console.log('disconnect')
    //     client?.send(JSON.stringify({
    //         type: 'unsubscribeToChannel',
    //         name: user.name,
    //     }))
    //     // navigate('/', { replace: true })
    //     setClient(null)

    // }








    return (
        <div className='w-max flex flex-col m-auto gap-5 mt-6 text-xs '>

            <button onClick={() => wConnect()} className={`${client ? 'hidden' : 'bg-blue-200 p-2 mx-24 rounded-md m-auto  '}`}>Connect</button>
     
    
            
        </div>
    )
}

export default Menu