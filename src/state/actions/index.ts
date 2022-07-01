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
    payload:number

}
export type Action = DepositAction | WithdrawAction | BankruptAction | JoinPlayerAction