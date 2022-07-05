import  { useEffect, useState, useRef } from 'react'
import { w3cwebsocket as ws } from 'websocket'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators, } from '../../state';
import { getPlayers } from '../../API_Call/apiCall'
import { ISocket } from '../interfaces/ISocket'
import { useCookies } from 'react-cookie';

const websocketURL:any =
process.env.NODE_ENV == "development"
  ? process.env.REACT_APP_DEV_WEBSOCKET
  : process.env.REACT_APP_PROD_WEBSOCKET;



const Menu = () => {
    const [ cookie, setCookies ] = useCookies(['UID']) 
    const dispatch = useDispatch()
    const {  joinUser, playersJoinned } = bindActionCreators(actionCreators, dispatch)
    const [client, setClient] = useState<ISocket | null>()
    let navigate = useNavigate();
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
    

    
    useEffect(()=>{
        if(cookie.UID) {
            navigate(`/mainroom/${cookie.UID}`)
        }   
    },[client])
    const wConnect = () => {
        const randomID = Math.floor(Math.random()*1000)
        const frontclient = new ws(websocketURL); //  Initialize  the client
        navigate(`/mainroom/${randomID}`, { replace: true })
        setCookies('UID',randomID,{ path: `/mainroom/${randomID}` });
        joinUser(frontclient)
        setClient(frontclient)
        console.log('you are connectet')
        console.log('status',)
    }
    return (
        <div className='w-max flex flex-col m-auto gap-5  text-xs '>
            {cookie.UID 
            ? 
            <button onClick={() => wConnect()} className={`${client ? 'hidden' : 'bg-red-200 p-2 mx-24 rounded-md m-auto  '}`}>Reconnect</button> 
            :
             <button onClick={() => wConnect()} className={`${client ? 'hidden' : 'bg-blue-200 p-2 mx-24 rounded-md m-auto  '}`}>Connect</button>}
        </div>
    )
}
export default Menu