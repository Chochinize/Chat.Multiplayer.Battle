const LeaveRoom = (username: any, param: any, cl: any, userset: void, mapfilter: void) => {
    cl.users?.send(JSON.stringify({
      type: 'unsubscribeToChannel',
      name: username,
      id: param
    }))
  }
  export default LeaveRoom