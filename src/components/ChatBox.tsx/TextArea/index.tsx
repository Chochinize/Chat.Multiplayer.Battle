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
  
  return (
    <div className='w-full border-4 flex border-cyan-500 h-[10%]  gap-x-4   p-1 relative'>
        
        <input 
            type="text"
            name='name'
            value={chat.name}
            required
            placeholder='Ýour Name'
            className=" placeholder-shadow-xl outline-none text-center border-b-0 lg:border-b-2"
            onChange={onChangeInput}
          />
        
        <button onClick={()=>sendChatMessage(chat.name,paramsID,client)} className=' w-[20%] h-full border-2 border-yellow-800'>input</button>
        </div>
  )
}


export default TextArea