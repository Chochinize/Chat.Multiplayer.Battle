import { ActionType } from "../action-type";
import { Action } from "../actions/index";

const initialState = {
  users: [],
  players: [],
  joinnedPlayers: [],
  userJoinned: false ,
  chatPlayer:[],
};

const reducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ActionType.PLAYERS:
      return {
        ...state,
        players: [action.payload],
      };

    case ActionType.USERJOINNED:
      return {
        ...state,
        userJoinned:action.payload };
    case ActionType.REFRESH:

      return {...state, players: state.players.filter((item:any)=> { 
          // console.log('STATE FROM BANK', state)
          // console.log('ACTION FROM BANK', action)
          // console.log('TYPE FROM BANK', action.type)
          // console.log('ITEM FROM BANK', item)
        return 
      })}
      case ActionType.MESSAGE:
        return{
          ...state,
          chatPlayer:[...state.chatPlayer,action.payload]
        }
    default:
      return state;
  }
};

export default reducer;
