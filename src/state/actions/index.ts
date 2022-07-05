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
    type:ActionType.JOIN,
    payload:any

}
interface GetPlayerAction {
    type:ActionType.PLAYERS,
    payload:any
}
interface RejoinPlayerAction{
    type:ActionType.REJOIN,
    payload:string
}
export type Action = DepositAction | WithdrawAction | BankruptAction | JoinPlayerAction | GetPlayerAction | RejoinPlayerAction