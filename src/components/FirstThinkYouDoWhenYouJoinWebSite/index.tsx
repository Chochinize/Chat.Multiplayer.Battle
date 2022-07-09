import  { useEffect, useState, useRef } from 'react'
import { w3cwebsocket as ws } from 'websocket'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators, } from '../../state';
import { getPlayers } from '../../API_Call/apiCall'
import { ISocket } from '../../interfaces/ISocket'
import { useCookies } from 'react-cookie';

const randomID = Math.floor(Math.random()*1000)
const websocketURL:any =
process.env.NODE_ENV == "development"
  ? process.env.REACT_APP_DEV_WEBSOCKET
  : process.env.REACT_APP_PROD_WEBSOCKET;
const Connection = () => {
    const [ cookie, setCookies ] = useCookies(['UID']) 
    const dispatch = useDispatch()
    const {  joinUser, playersJoinned } = bindActionCreators(actionCreators, dispatch)
    const [client, setClient] = useState<ISocket | null>()
    let navigate = useNavigate();
    const effectRan = useRef(false)    



    useEffect(()=>{
        if(cookie.UID) {
            navigate(`/mainroom/${cookie.UID}`)
        }   
    },[client])
    const wConnect = () => {
        const frontclient = new ws(websocketURL); //  Initialize  the client
        navigate(`/mainroom/${randomID}`, { replace: true })
        setCookies('UID',randomID,{ path: `/mainroom/${randomID}` });
   
        joinUser(frontclient)
        setClient(frontclient)
    }
    return (
        <div className='w-[31%]   text-xs absolute  border-blue-700 '>
            {cookie.UID 
            ? 
            <button onClick={() => wConnect()} className={`${client ? 'hidden' : 'bg-red-200 p-4 w-full   rounded-md    '}`}>WhatYouDoWhenYouDisconnectedForFirstTime / reconnect</button> 
            :
             <button onClick={() => wConnect()} className={`${client ? 'hidden' : 'bg-blue-200 w-[100%] p-4 rounded-md    '}`}>WhatYouDoWhenYouJoinInWebSiteForFurstTime</button>}
            
        </div>
    )
}
export default Connection