import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../../state';
import { IUser } from '../../../interfaces/IUser';
import sendChatMessage from '../../../RoomActions/SendMessageAction';
import { useParams } from 'react-router-dom';
import { BsEmojiSmile } from 'react-icons/bs';

const TextArea = () => {
  const client = useSelector((state: State) => state.bank)
  const paramsID = useParams().id;
  const [chat, setChat] = useState<IUser>({ name: '' })


  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    setChat({ ...chat, [name]: value });
  };
  const _handleKeyDown =  (e:any)=> {
    if (e.key === 'Enter') {
      setChat({name:''})
      sendChatMessage(chat.name,paramsID,client,client.setUserName.name)
   
    }
  }
  const searchName = client.players[0]?.data?.players[0].users.find((i:any)=>i.id === paramsID)
  const  popIconMenu = ()=>{
    console.log('popIcon')
  }
  return (
    <div className='w-full border-4 flex items-center  border-cyan-500 h-10      '>

      
        <BsEmojiSmile size={47} className='px-1' onClick={()=>popIconMenu()}/>
        
        <input
            disabled={!client.userJoinned ? true : false}
            type="text"
            name='name'
            value={chat.name}
            required
            placeholder='type something...'
            className="   outline-none  pl-2  text-start   rounded-full h-8  text-[18px]       border-2 w-full "
            onChange={onChangeInput}
            onKeyDown={(e)=>_handleKeyDown(e)}
          />
        
        <button onClick={()=>sendChatMessage(chat.name,paramsID,client,client.setUserName.name)} className=' w-[30%] hover:bg-blue-500  px-4 text-[18px] h-full border-2 border-blue-400 rounded-full bg-blue-300 text-white shadow-2xl'>Send</button>
        </div>
  )
}


export default TextArea