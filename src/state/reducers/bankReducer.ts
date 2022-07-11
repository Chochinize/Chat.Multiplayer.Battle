import { ActionType } from "../action-type";
import { Action } from "../actions/index";

const initialState = {
      users: [],
      players: [],
      setUserName: { name:'' },
      userJoinned: false,
      chatPlayer: [],
      modals:[],
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
                        userJoinned: action.payload,
                  };
            case ActionType.MESSAGE:
                  return {
                        ...state,
                        chatPlayer: [...state.chatPlayer, action.payload],
                        };
            case ActionType.SETUSERNAME:
                        const { name , value } = action.payload      
                  return{
                        ...state,
                        setUserName: { ...state.setUserName.name, [name]: value },
                        };
            case ActionType.MODALS:
                  console.log('modal used')
                  return{
                        ...state,
                        modals: action.payload
                        };

            default:
                  return state;
      }
};

export default reducer;
