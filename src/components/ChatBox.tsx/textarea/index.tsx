import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../../state';
import { IUser } from '../../../interfaces/IUser';
import sendChatMessage from '../../../RoomActions/SendMessageAction';
import { useParams } from 'react-router-dom';

const TextArea = () => {
  const client = useSelector((state: State) => state.bank)
  const paramsID = useParams().id;
  const [chat, setChat] = useState<IUser>({ name: '' })



  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    setChat({ ...chat, [name]: value });
  };
  console.log('dalie  on',client.userJoinned)
  const _handleKeyDown =  (e:any)=> {
    if (e.key === 'Enter') {
      setChat({name:''})
      sendChatMessage(chat.name,paramsID,client)
      console.log('do validate');
    }
  }
  return (
    <div className='w-full border-4 flex border-cyan-500 h-[10%]  gap-x-4   p-1 relative'>
        
        <input
            disabled={!client.userJoinned ? true : false}
            type="text"
            name='name'
            value={chat.name}
            required
            placeholder='type something...'
            className="   outline-none text-center border-b-0 lg:border-b-2"
            onChange={onChangeInput}
            onKeyDown={(e)=>_handleKeyDown(e)}
          />
        
        <button onClick={()=>sendChatMessage(chat.name,paramsID,client)} className=' w-[20%] h-full border-2 border-yellow-800'>input</button>
        </div>
  )
}


export default TextArea