import React, { useEffect, useState, useRef } from 'react'
import { w3cwebsocket as ws } from 'websocket'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';
import { JoinMainRoom, ExitMainRoom } from './../../API_Call/apiCall'
import { useCookies } from 'react-cookie'




interface Isocket {
    onopen: (arg: any) => any;
    onmessage: (arg: any) => any
    close: () => void
}


const Menu = () => {


    const [cookies, setCookie] = useCookies(["user"]);

    function handleCookie() {
      setCookie("user", "gowtham", {
        path: "/"
      });
    }                       

    const effectRan = useRef(false)

    useEffect(() => {


        // if(effectRan.current === false){
        //     const fetchUsers = async () => {
        //         const response = await fetch('https://jsonplaceholder.typicode.com/users')
        //         const json = await response.json()
        //         console.log(json)


        //     }
        //     fetchUsers()
        //     return ()=>{  
        //         console.log('unmounted')
        //         effectRan.current = true
        //     }
        // }




    }, [])

    let navigate = useNavigate();
    const [client, setClient] = useState<Isocket | null>()

    const dispatch = useDispatch()
    const { depositMoney, withDraw, bankrupt, join } = bindActionCreators(actionCreators, dispatch)
    const amount = useSelector((state: State) => state.bank)
    const id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    const wConnect = () => {
        const frontclient = new ws('ws://localhost:5050'); //  Initialize  the client
        JoinMainRoom(id)
        setClient(frontclient)
        navigate("/room", { replace: true });
        console.log('you are connectet')
    }
    useEffect(() => {
        if (!client) return
        client.onopen = () => {
            client.onmessage = (message) => {
                console.log('what message', message)
            }
        }
    }, [client])
    const wDisconnect = () => {
        client && client.close()
        ExitMainRoom(id)

        console.log('disconnect')
        navigate('/', { replace: true })
        setClient(null)
    }
    return (
        <div className='w-full h-1/4'>
            <div className='flex flex-col gap-4 justify-center border-2 h-full '>
                <button onClick={() => wConnect()} className={`${client ? 'hidden' : 'bg-blue-200 mx-24 rounded-md absolute top-2'}`}>Connect</button>
                <button onClick={() => wDisconnect()} className={`${!client ? 'hidden' : 'bg-red-200 mx-24 rounded-md absolute top-2'}`}>Disconect</button>
            </div>
        </div>
    )
}

export default Menu