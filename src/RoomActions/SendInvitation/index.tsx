const SendInvitation = (userName: any, userID: any, cl: any,senderName:any,senderID:any) => {
                    cl.users?.send(JSON.stringify({
                      type:'invitePlayer',
                      name: userName,
                      id: userID,
                      senderName:senderName,
                      senderID:senderID
                    }))
                  }
                  export default SendInvitation