import { ActionType } from '../action-type/index'
interface DepositAction {
    type:ActionType.DEPOSIT,
    payload:number
}
interface WithdrawAction {
    type:ActionType.WITHDRAW,
    payload:number
}
interface BankruptAction {
    type:ActionType.BANKRUPT
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
interface RefreshPlayerAction {
    type:ActionType.REFRESH,
    payload:any
}
interface CharMessageAction {
    type:ActionType.MESSAGE,
    payload:any
}

export type Action = 
DepositAction |
WithdrawAction|
BankruptAction|
JoinPlayerAction|
GetPlayerAction|
InvitePlayerAction|
RefreshPlayerAction|
CharMessageAction
