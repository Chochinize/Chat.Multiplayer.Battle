const JoinRoom = (username: string, param: any, cl: any, userset: void) => {
    cl.users?.send(JSON.stringify({
      type: 'subscribeToChannel',
      name: username,
      id: param
    }))
  }

  export default JoinRoom