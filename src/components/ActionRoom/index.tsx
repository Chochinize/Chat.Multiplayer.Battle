export const JoinRoom = (username: string, param: any, cl: any, userset: void) => {
  cl.users?.send(JSON.stringify({
    type: 'subscribeToChannel',
    name: username,
    id: param
  }))
}
export const LeaveRoom = (username: any, param: any, cl: any, userset: void, mapfilter: void) => {
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

  // const LeaveRoom = () => {
  //   setUserJoinned(false)
  //   setMsg(msg => msg.filter(x => x.payload !== user.name))
  //   client.users?.send(JSON.stringify({
  //     type: 'unsubscribeToChannel',
  //     name: user.name,
  //     id: paramsID
  //   }))
  // }