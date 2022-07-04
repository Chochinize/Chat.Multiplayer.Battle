import axios from "axios";
export const JoinMainRoom = async (playerID: any) => {
    try {
        const res = await axios.post("/joinMainRoom",{playerID});
        console.log(res)
    } catch (err) {
        console.log(err)

    }
};

export const ExitMainRoom = async (playerID: any) => {
    try {
        const res = await axios.post('/exitMainRoom', { playerID })
    } catch (error) {
        console.log(error)
    }
}

export const getPlayers = async()=>{
    try {
        const getPlayers = await axios.get('/getPlayers')
        return  getPlayers;
    } catch (error) {
        
    }
}

export const Cookies =async () => {
    try {
        const sendCookie = await axios.get('/')
        return sendCookie
    } catch (error) {
        console.log(error)
    }
}