const SendInvitation = (userName: any, userID: any, cl: any) => {
                    cl.users?.send(JSON.stringify({
                      type:'invitePlayer',
                      name: userName,
                      id: userID
                    }))
                  }
                  export default SendInvitation