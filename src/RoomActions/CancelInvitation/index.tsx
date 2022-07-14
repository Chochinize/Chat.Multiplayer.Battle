const CancelInvitation = (cl:any,userID:string | undefined) => {
                    cl.users?.send(JSON.stringify({
                     type:'cancelInvtiation',
                     id:userID,
                     status:'free'
                    }))
                  }
export default CancelInvitation