import { ActionType } from "../action-type";
import { Action } from "../actions/index";

const initialState = {
      users: [],
      players: [],
      setUserName: { name:'' },
      userJoinned: false,
      chatPlayer: [],
};

const reducer = (state: any = initialState, action: Action) => {
      switch (action.type) {
            case ActionType.USERS:
                  return {
                        ...state,
                        users: action.payload,
                  };
            case ActionType.PLAYERS:
              
                  {
                  }
                  return {
                        ...state,
                        players: [action.payload],
                  };

            case ActionType.USERJOINNED:
                  return {
                        ...state,
                        userJoinned: action.payload,
                  };
            case ActionType.REFRESH:
                  return {
                        ...state,
                        players: state.players.filter((item: any) => {
                              return;
                        }),
                  };
            case ActionType.MESSAGE:
                  return {
                        ...state,
                        chatPlayer: [...state.chatPlayer, action.payload],
                  };
            case ActionType.SETUSERNAME:
              const { name , value } = action.payload


              console.log('lets see value and action ',value ,name )
                  return {
                        ...state,
                        setUserName: { ...state.setUserName.name, [name]: value },
                  };

            default:
                  return state;
      }
};

export default reducer;
