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