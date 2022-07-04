import { ActionType } from '../action-type';
import { Action } from '../actions/index'



const initialState = {
    users:[],players:[],joinnedPlayers:[]
}


const reducer = (state: any = initialState, action:Action)=>{
    switch(action.type){
        case ActionType.JOIN:
            return {
                ...state,
                users: action.payload,
              };
        case ActionType.PLAYERS:
            return{
                ...state,
                players:action.payload
            }
        default:
            return state 
    }
}

export default reducer