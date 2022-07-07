import React from 'react'
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux'
import { State } from '../../state';


export const JoinRoom =(username:any,param:any,cl:any,userset:void) => {

    cl.users?.send(JSON.stringify({
        type: 'subscribeToChannel',
        name: username,
        id: param
      }))
}
export const LeaveRoom = (username:any,param:any,cl:any,userset:void,mapfilter:void) => {
  // setUserJoinned(false)
  // setMsg(msg => msg.filter(x => x.payload !== user.name))
  cl.users?.send(JSON.stringify({
    type: 'unsubscribeToChannel',
    name: username,
    id: param
  }))
}
//   const JoinRoom = () => {
//     setUserJoinned(true)
//     client.users?.send(JSON.stringify({
//       type: 'subscribeToChannel',
//       name: user.name,
//       id: paramsID
//     }))
//   };