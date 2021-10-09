export const ACTIONS = {
    ADD_NEW_TRANSACTION: 'ADD_NEW_TRANSACTION'
}

const initialState = {
    total: 0.00,
    incomes: [],
    expenses: [],
    recentTransactions: [{ hi: 'hello' }]
}

export default (state = initialState, actions) => {
    return state;
}