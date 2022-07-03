import React, { useEffect, useState, useRef } from 'react'
import { w3cwebsocket as ws } from 'websocket'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';
import { JoinMainRoom, ExitMainRoom } from './../../API_Call/apiCall'
import { useCookies } from 'react-cookie'
import Room from '../Room/Room';
import axios from 'axios'




interface Isocket {
    onopen: (arg: any) => any;
    onmessage: (arg: any) => any
    close: () => void;
    send:(arg:string)=>any
}


const Menu = () => {
    const [user, setUser] = useState<IUser>({ name: '' })
    // let navigate = useNavigate();
    // const id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    
    // // const [cookies, setCookie, removeCookie] = useCookies(["UID"]);
    
    // // function handleCookie(arg:number) {
    // //   setCookie("UID", arg, {
        // //     path: "/"
        // //   });
        // // }    
        // // function handleRemoveCookie() {
    // //     removeCookie("UID");
    // //   }                   

    // const effectRan = useRef(false)   
    const [client, setClient] = useState<Isocket | null>()
    const dispatch = useDispatch()
    const { depositMoney, withDraw, bankrupt, join } = bindActionCreators(actionCreators, dispatch)
    const amount = useSelector((state: State) => state.bank)
    const[msg,setMsg]= useState<any[]>([])
    const wConnect = () => {
        const frontclient = new ws('ws://localhost:5050'); //  Initialize  the client
        setClient(frontclient)
        // navigate("/room", { replace: true });
        console.log('you are connectet')
    }
    useEffect(() => {
        if (!client) return
        client.onopen = () => {
            client.onmessage = (message) => {
                console.log('what message', message)
                setMsg(msg=>[...msg,message])
            }
        }
    }, [client])
    const wDisconnect = () => {
        client && client.close()

        console.log('disconnect')
        // navigate('/', { replace: true })
        setClient(null)
    }
    const JoinRoom = () => {
        setMsg(msg=>[...msg,user.name])
        client?.send(JSON.stringify({
            type:'subscribeToChannel',
            name:user.name,
        }))
    };
    const LeaveRoom = ()=>{
        client?.send(JSON.stringify({
            type:'unsubscribeToChannel',
            name:user.name,
        }))
    }
    
    
    // // console.log(client)
    // // console.log(cookies)
    interface IUser {
        name: any;
    }
    
  

    const onChangeInput = (e: any) => {
        console.log(user)
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
    console.log(msg.map(i=>i.data))
    return (
        <div className='border-2   w-max flex text-xs '>
            <button onClick={() => wConnect()} className={`${client  ? 'hidden' : 'bg-blue-200 mx-24 rounded-md absolute top-2'}`}>Connect</button>
            <button onClick={() => wDisconnect()} className={`${!client  ?  'hidden' : 'bg-red-200 mx-24 rounded-md absolute top-2'}`}>Disconect</button>
            <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className=" absolute top-10 placeholder-shadow-xl outline-none text-center "
                onChange={onChangeInput}
            />
            <button onClick={()=>JoinRoom()}>Join room</button>
            <button onClick={()=>LeaveRoom()}>Leave room</button>
            {/* <form onSubmit={JoinRoom}>

                <button onClick={() => wConnect()} className={`${client ? 'hidden' : 'bg-blue-200 mx-2 rounded-md absolute '}`}>Connect</button>
                <button onClick={() => wDisconnect()} className={`${!client ? 'hidden' : 'bg-red-200 mx-2 rounded-md absolute '}`}>Disconect</button>
            </form> */}
            {/* <div className='flex flex-col gap-4 justify-center border-2 h-full '>
                <label htmlFor="">
                

                </label>
                
            </div> */}
            {/* {msg.map(i=>i)} */}
            
        </div>
    )
}

export default Menu