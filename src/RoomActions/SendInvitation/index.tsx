const SendInvitation = (userName: any, userID: any, cl: any,senderName:any,senderID:any,senderStatus:any) => {
  
                    cl.users?.send(JSON.stringify({
                      type:'invitePlayer',
                      name: userName,
                      id: userID,
                      senderName:senderName,
                      senderID:senderID,
                      status:senderStatus

                    }))
                  }
                  export default SendInvitation