import { ActionType } from '../action-type/index'
interface DepositAction {
    type:ActionType.DEPOSIT,
    payload:number
}
interface WithdrawAction {
    type:ActionType.WITHDRAW,
    payload:number
}
interface SetUserNameAction {
    type:ActionType.SETUSERNAME
    payload:any
}
interface JoinPlayerAction {
    type:ActionType.USERS,
    payload:any

}
interface GetPlayerAction {
    type:ActionType.PLAYERS,
    payload:any
}

interface InvitePlayerAction {
    type:ActionType.MODALS,
    payload:boolean
}

interface CharMessageAction {
    type:ActionType.MESSAGE,
    payload:any
}
interface UserJoinnedAction {
    type:ActionType.USERJOINNED,
    payload:boolean
}
interface UpdateEnemyAction {
    type:ActionType.ENEMYUPDATE,
    payload:any,
}
interface UpdateSelfAction {
    type:ActionType.SELFUPDATE,
    payload:any
}
export type Action = 
DepositAction |
WithdrawAction|
SetUserNameAction|
JoinPlayerAction|
GetPlayerAction|
InvitePlayerAction|
CharMessageAction|
UserJoinnedAction|
UpdateEnemyAction |
UpdateSelfAction

