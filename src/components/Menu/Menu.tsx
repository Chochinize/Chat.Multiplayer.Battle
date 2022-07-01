import React, { useEffect, useState } from 'react'
import { w3cwebsocket as ws } from 'websocket'
import { useNavigate } from "react-router-dom";
import Room from '../Room/Room';



console.log(ws)


interface Isocket {
    onopen: (arg: any) => any;
    onmessage: (arg: any) => any
    close: () => void
}


const Menu = () => {

    let navigate = useNavigate();

    const [client, setClient] = useState<Isocket | null>()




    const wConnect = () => {
        const frontclient = new ws('ws://localhost:5050'); //  Initialize  the client
        setClient(frontclient)
        navigate("/room", { replace: true });
        console.log('you are connectet')
    }

    useEffect(() => {
        if (!client) return
        client.onopen = () => {
            client.onmessage = (message) => {
                console.log(message)
            }
        }


    }, [client])

    const wDisconnect = () => {
        client?.close()
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