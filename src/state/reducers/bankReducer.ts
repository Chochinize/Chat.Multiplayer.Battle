import { ActionType } from '../action-type';
import { Action } from '../actions/index'



const initialState = {
    players:[], 
}


const reducer = (state: any = initialState, action:Action)=>{
    switch(action.type){
        case ActionType.JOIN:
            return {
                ...state,
                players: action.payload,
              };
        case ActionType.DEPOSIT:
            return state + action.payload;
        // case ActionType.WITHDRAW:
        //     return state-action.payload;
        // case ActionType.BANKRUPT:
        //     return 0;
        default:
            return state 
    }
}

export default reducer