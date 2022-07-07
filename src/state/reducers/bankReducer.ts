import { ActionType } from "../action-type";
import { Action } from "../actions/index";

const initialState = {
  users: [],
  players: [],
  joinnedPlayers: [],
  invitePlayerModal: true || false
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

    case ActionType.MODALS:
      return {
        ...state,
        rejoinPlayer: action.payload,
      };
    case ActionType.REFRESH:

      return {...state, players: state.players.filter((item:any)=> { 
          console.log('STATE FROM BANK', state)
          console.log('ACTION FROM BANK', action)
        return item.name !== action.payload
      }) }
    default:
      return state;
  }
};

export default reducer;
