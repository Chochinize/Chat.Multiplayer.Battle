const sendChatMessage = (chatname:string, param:any,cl:any)=>{
                    
                    const searchName = cl.players[0]?.data?.players[0].users.find((i:any)=>i.id === param)
                    cl.users?.send(JSON.stringify({
                      type:'chatMessageEvent',
                      msg: chatname,
                      id: param,
                      name:searchName.name,
                    }))
                  }
export default sendChatMessage