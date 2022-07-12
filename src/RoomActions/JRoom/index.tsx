const JoinRoom = (username: string, param: any, cl: any, userset: void) => {
    cl.users?.send(JSON.stringify({
      type: 'subscribeToChannel',
      name: username,
      id: param,
      status: cl.modalsInvitation.status
    }))
  }

  export default JoinRoom