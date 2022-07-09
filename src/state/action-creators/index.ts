import { ActionType } from "../action-type"
import { Dispatch } from "redux"
import { Action } from '../actions/index'
export const depositMoney = (amount:number)=>{
    return (dispatch:Dispatch<Action>) =>{
        dispatch({
            type:ActionType.DEPOSIT,
            payload:amount
        })
    }
}

export const withDraw = (amount:number)=>{
    return (dispatch:Dispatch<Action>) =>{
        dispatch({
            type:ActionType.WITHDRAW,
            payload:amount
        })
    }
}

export const bankrupt = ()=>{
    return (dispatch:Dispatch<Action>) =>{
        dispatch({
            type:ActionType.BANKRUPT
        })
    }
}

export const joinUser = (id:any)=>{
    return (dispatch:Dispatch<Action>) =>{
        dispatch({
            type:ActionType.USERS,
            payload:id
        })
    }
}

export const playersJoinned = (id:any)=>{
    return (dispatch:Dispatch<Action>) =>{
        dispatch({
            type:ActionType.PLAYERS,
            payload:id
        })
    }
}

export const inviteUser = (id:any)=>{
    return(dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionType.MODALS,
            payload:id
        })
    }
}
export const refreshPlayer = (id:any)=>{
    return(dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionType.REFRESH,
            payload:id
        })
    }
}
export const playerChat = (id:any)=>{
    return(dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionType.MESSAGE,
            payload:id
        })
    }
}

export const userSetName = (id:any)=>{
    return(dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionType.USERJOINNED,
            payload:id
        })
    }
}