import React, { useEffect, useState, useRef } from 'react'
import { w3cwebsocket as ws } from 'websocket'
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators,State } from '../../state';
import { joinRoom } from './../../API_Call/apiCall'





interface Isocket {
    onopen: (arg: any) => any;
    onmessage: (arg: any) => any
    close: () => void
}


const Menu = () => {
    
const effectRan = useRef(false)

useEffect(()=>{







},[])

    let navigate = useNavigate();
    const [client, setClient] = useState<Isocket | null>()

    const dispatch = useDispatch()
    const { depositMoney, withDraw, bankrupt,join} = bindActionCreators(actionCreators,dispatch)
    const amount = useSelector((state:State)=>state.bank)


    console.log(amount)

    const wConnect = () => {
        const  id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
        const frontclient = new ws('ws://localhost:5050'); //  Initialize  the client
        console.log(frontclient)

        setClient(frontclient)
        navigate("/room", { replace: true });
        console.log('you are connectet')
        join(id)
        
    }
    joinRoom('sssssss')

    useEffect(() => {
        if (!client) return
        client.onopen = () => {
            client.onmessage = (message) => {
                console.log('what message',message)
            }
        }


    }, [client])

    const wDisconnect = () => {
        client && client.close()
        console.log('disconnect')
        navigate('/',{replace:true})
        setClient(null)

    }
    return (
        <div className='w-full h-1/4'>
            <div className='flex flex-col gap-4 justify-center border-2 h-full '>
                <button onClick={() => wConnect()} className={`${client ? 'hidden': 'bg-blue-200 mx-24 rounded-md absolute top-2'}`}>Connect</button>
                <button onClick={() => wDisconnect()} className={`${!client ? 'hidden': 'bg-red-200 mx-24 rounded-md absolute top-2'}`}>Disconect</button>
            </div>

        </div>

    )
}

export default Menu