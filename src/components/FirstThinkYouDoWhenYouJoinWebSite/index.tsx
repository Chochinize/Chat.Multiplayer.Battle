import  { useEffect, useState } from 'react'
import { w3cwebsocket as ws } from 'websocket'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators, } from '../../state';

import { ISocket } from '../../interfaces/ISocket'
import { useCookies } from 'react-cookie';


const randomID = Math.floor(Math.random()*1000)
const websocketURL:any =
process.env.NODE_ENV === "development"
  ? process.env.REACT_APP_DEV_WEBSOCKET
  : process.env.REACT_APP_PROD_WEBSOCKET;
const Connection = () => {
    const [ cookie, setCookies ] = useCookies(['UID']) 
    const dispatch = useDispatch()
    const {  joinUser } = bindActionCreators(actionCreators, dispatch)
    const [client, setClient] = useState<ISocket | null>()
    let navigate = useNavigate();
      



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
        console.log('123');
    }
    return (
        <div className='w-[31%]   text-xs absolute  border-blue-800 '>
            {cookie.UID 
            ? 
            <button onClick={() => wConnect()} className={`${client ? 'hidden' : 'bg-red-200 p-4 w-full   rounded-md    '}`}> Reconnect</button> 
            :
             <button onClick={() => wConnect()} className={`${client ? 'hidden' : 'bg-blue-200 w-[100%] p-4 rounded-md    '}`}>Connect</button>}
             
            
        </div>
    )
}
export default Connection