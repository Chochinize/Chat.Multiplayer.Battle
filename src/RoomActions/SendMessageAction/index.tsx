const sendChatMessage = (chatname:string, param:any,cl:any,playerName:string)=>{
                    
  
           
                    cl.users?.send(JSON.stringify({
                      type:'chatMessageEvent',
                      msg: chatname,
                      id: param,
                      name:playerName
                    }))
                  }
export default sendChatMessage