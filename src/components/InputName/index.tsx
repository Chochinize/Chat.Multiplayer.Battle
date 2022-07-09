import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../state';
import { useNavigate } from "react-router-dom";
import { IUser, IFX } from '../../interfaces/IUser'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux'
import { actionCreators, } from '../../state';
import { LeaveRoom, JoinRoom } from '../../RoomActions';





const InputName = () => {

  const paramsID = useParams().id;
  const compareID = useRef(false)
  const effectRan = useRef(false)


  const [msg, setMsg] = useState<any[]>([])
  const client = useSelector((state: State) => state.bank)
  const [userJoinned, setUserJoinned] = useState(false)
  const [user, setUser] = useState<IUser>({ name: '' })
  const [cookie, setCookies] = useCookies(['UID'])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userSetName } = bindActionCreators(actionCreators, dispatch)
  const [findName, setFindName] = useState<IFX>({ founded: '' })


  const onChangeInput = (e: any) => {
                    const { name, value } = e.target;
                    setUser({ ...user, [name]: value });
};
                    
                    const setUserName = ()=>{
                                        userSetName(false)               
                    }
                
  return (
    <div className='w-[100%] h-full flex justify-between  relative'>
{client.users ? (<div className='w-max flex flex-col lg:flex-row m-auto gap-2 border-2 '>
          <input disabled={client.userJoinned ? true : false}
            type="text"
            name='name'
            value={user.name || findName?.founded}
            required
            placeholder='Ýour Name'
            className=" placeholder-shadow-xl outline-none text-center border-b-0 lg:border-b-2"
            onChange={onChangeInput}
          />

          {client.userJoinned
            ?
            <button
              onClick={() => LeaveRoom(user.name, paramsID, client, setUserName(), setMsg(msg => msg.filter(x => x.payload !== user.name)))}
              className='border-2   p-2 hover:bg-slate-50'>Leave Room</button>
            :
            <button
              disabled={user.name.length === 0 ? true : false}
              onClick={() => JoinRoom(user.name, paramsID, client,setUserName())}
              className={`${user.name.length === 0 ? 'cursor-not-allowed' : ''} border-2 p-2 hover:bg-slate-100`}>Join Room</button>}
        </div>)
          :
          ''}
 
    </div>
  )
}

export default InputName