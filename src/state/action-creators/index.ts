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

export const join = (id:any)=>{
    return (dispatch:Dispatch<Action>) =>{
        dispatch({
            type:ActionType.JOIN,
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

export const rejoin = (id:string)=>{
    return(dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionType.REJOIN,
            payload:id
        })
    }
}


