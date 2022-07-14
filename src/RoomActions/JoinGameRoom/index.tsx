import { useNavigate } from "react-router-dom";
const JoinGameRoom = (cl:any) => {

                    const navigate = useNavigate();
                    cl.users?.send(JSON.stringify({
                    type:'acceptInvitation',
                    name:cl.modalsInvitation.name,
                    id:cl.modalsInvitation.userID,
                    senderName:cl.modalsInvitation.senderName,
                    senderID:cl.modalsInvitation.senderID,
                    status:'playing',
                  }))
}

export default JoinGameRoom