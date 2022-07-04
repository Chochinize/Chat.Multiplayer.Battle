import React, { useEffect, useState, useRef, Children } from 'react'
import { w3cwebsocket as ws } from 'websocket'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';
import { getPlayers } from '../../API_Call/apiCall'




interface Isocket {
    onopen: (arg: any) => any;
    onmessage: (arg: any) => any
    close: () => void;
    send: (arg: string) => any
}


const Menu = () => {


    const [user, setUser] = useState<IUser>({ name: '' })
    const [userJoinned, setUserJoinned] = useState(false)
    const [client, setClient] = useState<Isocket | null>()
    let navigate = useNavigate();
    const [player, setPlayer] = useState<any>([])
    const effectRan = useRef(false)

    //   console.log(player.data?.players[0].users.map((player:any)=><li>{player}</li>))
    useEffect(() => {
        if (effectRan.current === false) {
            const fetchPlayers = async () => {
                let players = await getPlayers()
                setPlayer(players)
            }
            fetchPlayers()
            return () => {
                effectRan.current = true
            }
        }
    }, [client])

    const dispatch = useDispatch()
    const { depositMoney, withDraw, bankrupt, join } = bindActionCreators(actionCreators, dispatch)
    const amount = useSelector((state: State) => state.bank)
    const [msg, setMsg] = useState<any[]>([])



    useEffect(() => {
        if (!client) {
            return setMsg([]) 
            
        }
        client.onopen = () => {
            client.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data)
                switch (dataFromServer.type) {
                    case 'subscribe':
                        setMsg(msg => [...msg, dataFromServer.payload])
                        console.log('datichka', dataFromServer)
                        break;
                    case 'unsubscribe':
                        setMsg(msg => msg.filter(x => x !== dataFromServer.payload))
                        console.log('dati', dataFromServer)

                        break
                }
            }
        }
       
        
        return () => {
            client.close();
            console.log('Websocket close')
        }
    }, [client])
    
    const wConnect = () => {
        const frontclient = new ws('ws://localhost:5050'); //  Initialize  the client
        setClient(frontclient)
        console.log('you are connectet')
        console.log('status', )
        // navigate('/room',{replace:true})
    }

    const wDisconnect = () => {
        client && client.close()
        setUserJoinned(false)
        console.log('disconnect')
        client?.send(JSON.stringify({
            type: 'unsubscribeToChannel',
            name: user.name,
        }))
        // navigate('/', { replace: true })
        setClient(null)

    }
    const JoinRoom = () => {
        // setMsg(msg => [...msg, user.name])
        // navigate('/room',{replace:true})
        setUserJoinned(true)
        client?.send(JSON.stringify({
            type: 'subscribeToChannel',
            name: user.name,
        }))
    };
    const LeaveRoom = () => {
        setUserJoinned(false)
        setMsg(msg => msg.filter(x => x !== user.name))
        client?.send(JSON.stringify({
            type: 'unsubscribeToChannel',
            name: user.name,
        }))
    }


    // // console.log(client)
    // // console.log(cookies)
    interface IUser {
        name: any;
    }


    const onChangeInput = (e: any) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    // const JoinRoom = async (e: any) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post("/joinMainRoom", { name: user.name });
    //     } catch (err) {
    //         console.log(err)
    //     }
    // };


    return (
        <div className='w-max flex flex-col m-auto gap-5 mt-6 text-xs '>

            <button onClick={() => wConnect()} className={`${client ? 'hidden' : 'bg-blue-200 p-2 mx-24 rounded-md m-auto  '}`}>Connect</button>
            {/* <button onClick={() => wDisconnect()} className={`${!client ? 'hidden' : 'bg-red-200 p-2 mx-24 rounded-md m-auto '}`}>Disconect</button> */}
            {client ? (<div className='w-max flex flex-col m-auto gap-2  '>
                <input disabled={userJoinned ? true : false}
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className=" placeholder-shadow-xl outline-none text-center "
                    onChange={onChangeInput}
                />
                {userJoinned ? <button onClick={() => LeaveRoom()} className='border-2 p-2 hover:bg-slate-50'>Leave Room</button> : <button onClick={() => JoinRoom()} className='border-2 p-2 hover:bg-slate-50'>Join Room</button>}
            </div>) : ''}
            {player.data?.players[0].users.map((player: any, i: any) => <div key={i} className='' >{player}</div>)}
            {msg.map((item: any, index) => <div key={index}>{item}</div>)}

        </div>
    )
}

export default Menu