
export const  joinRoom= async(playerID:string)=>{
    const response= await fetch('http://localhost:5050/',{
        method:'POST',
        mode:'no-cors',
        headers:{'Content-Type':'application/json'},
        body:'some very long string',

    })
    const res = await response.json()
    console.log(res)
    return res
}