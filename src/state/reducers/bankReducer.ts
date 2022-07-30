import { ActionType } from "../action-type";
import { Action } from "../actions/index";

const initialState = {
  users: [],
  players: [],
  setUserName: { name: "" },
  userJoinned: false,
  chatPlayer: [],
  modalsInvitation: {
    name: "",
    userID: "",
    senderName: "",
    senderID: "",
    status: "free",
  },
  enemy: {
    position: {
      xPos: 0,
      yPos: 426,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    h: 150,
    gravity: 0.2,
    keys: {
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
      w: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
    },
    attackBox:{
      positionX:420,
      positionY:426,
      width:100,
      height:50,
    }
  },
  
  self: {
    position: {
      xPos: 420,
      yPos: 426,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    h: 150,
    gravity: 0.2,
    keys: {
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
      w: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
    },
  },
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
      const { name, value } = action.payload;
      return {
        ...state,
        setUserName: { ...state.setUserName.name, [name]: value },
      };
    case ActionType.MODALS:
      return {
        ...state,
        modalsInvitation: action.payload,
      };
    case ActionType.SELFUPDATE:
      // console.log(state);
      // console.log("actionpayload", action.payload.key);
      // console.log("actionpayload", action.payload.type);
      switch (action.payload.key) {
        case "d":
          switch (action.payload.type) {
            case "keydown":
                  // console.log('keydown is concerned')
              return {
                ...state,
                self: {
                  ...state.self,
                  position:{
                        ...state.self.position,
                        xPos:state.self.position.xPos
                  },
                  keys: {
                    ...state.self.keys,
                    d: {
                      pressed: true,
                    },
                  },
                 
                },
              };
            case "keyup":
              return {
                ...state,
                self: {
                  ...state.self,
                  keys: {
                    ...state.self.keys,
                    d: {
                      pressed: false,
                    },
                  },
                },
              };
            default:
              return state;
          }
        case "a":
          switch (action.payload.type) {
            case "keydown":
                  return {
                        ...state,
                        self: {
                          ...state.self,
                          keys: {
                            ...state.self.keys,
                            a: {
                              pressed: true,
                            },
                          },
                        },
                      };
            case "keyup":
                  return {
                        ...state,
                        self: {
                          ...state.self,
                          keys: {
                            ...state.self.keys,
                            a: {
                              pressed: false,
                            },
                          },
                        },
                      };
            default:
              return state;
          }
          case "w":
            switch (action.payload.type) {
              case "keydown":
                  
                return {
                  ...state,
                  self: {
                    ...state.self,
                    velocity: {
                      ...state.self.velocity,
                      y: state.self.velocity.y - 10,
                    },
                    keys: {
                      ...state.self.keys,
                      w: {
                        pressed: true,
                      },
                    },
                  },
                };
              case "keyup":
                return {
                  ...state,
                  self: {
                    ...state.self,
                    keys: {
                      ...state.self.keys,
                      w: {
                        pressed: false,
                      },
                    },
                  },
                };
              default:
                return state;
            }
        default:
          return state;
      }

    case ActionType.ENEMYUPDATE:
      const { key, type } = action.payload;
      // console.log(key);
      // console.log(key);
      switch (key) {
        case "d":
          switch (type) {
            case "keydown":
              return {
                ...state,
                enemy: {
                  ...state.enemy,
                  keys: {
                    ...state.enemy.keys,
                    d: {
                      pressed: true,
                    },
                  },
                },
              };
            case "keyup":
              return {
                ...state,
                enemy: {
                  ...state.enemy,
                  keys: {
                    ...state.enemy.keys,
                    d: {
                      pressed: false,
                    },
                  },
                },
              };

            default:
              return state;
          }
        case "a":
          switch (type) {
            case "keydown":
              return {
                ...state,
                enemy: {
                  ...state.enemy,
                  keys: {
                    ...state.enemy.keys,
                    a: {
                      pressed: true,
                    },
                  },
                },
              };
            case "keyup":
              return {
                ...state,
                enemy: {
                  ...state.enemy,
                  keys: {
                    ...state.enemy.keys,
                    a: {
                      pressed: false,
                    },
                  },
                },
              };
            default:
              return state;
          }
        case "w":
          switch (type) {
            case "keydown":
              return {
                ...state,
                enemy: {
                  ...state.enemy,
                  velocity: {
                    ...state.enemy.velocity,
                    y: state.enemy.velocity.y - 10,
                  },
                  keys: {
                    ...state.enemy.keys,
                    w: {
                      pressed: true,
                    },
                  },
                },
              };
            case "keyup":
              return {
                ...state,
                enemy: {
                  ...state.enemy,
                  keys: {
                    ...state.enemy.keys,
                    w: {
                      pressed: false,
                    },
                  },
                },
              };
            default:
              return state;
          }
        default:
          return state;
      }
    default:
      return state;
  }
};

export default reducer;
