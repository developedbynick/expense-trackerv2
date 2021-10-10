export const ACTIONS = {
    ADD_NEW_TRANSACTION: 'ADD_NEW_TRANSACTION',
    REMOVE_TRANSACTION: 'REMOVE_TRANSACTION',
    SET_STATE: 'SET_STATE'
}

const initialState = {
    total: 0.00,
    incomes: [],
    expenses: [],
    recentTransactions: []
}
const formatState = (state = initialState) => {
    // The purpose of this function is to do the necessary calculations whenever an income or expense is added or removed.

    // 0. Copy state into variable
    const stateCopy = state;

    // 1. Loop over incomes and return a total value
    const totalIncomes = stateCopy.incomes.reduce((acc, income) => {
        return acc + income.price
    }, 0)

    // 2. Loop over expenses and return a total value
    const totalExpenses = stateCopy.expenses.reduce((acc, expense) => {
        return acc + expense.price
    }, 0)

    // 3. Calculate total Price
    stateCopy.total = totalIncomes - totalExpenses;

    // 4. Return new State
    return stateCopy;
}

export default (state = initialState, action) => {
    let stateToBe = state;
    if (ACTIONS.SET_STATE === action.type) {
        return action.state;
    }
    if (ACTIONS.ADD_NEW_TRANSACTION === action.type) {
        const { transaction } = action;
        let type;
        if (transaction.isIncome === true) type = 'incomes';
        else type = 'expenses'
        stateToBe = {
            ...state,
            [type]: [transaction, ...state[type],],
            recentTransactions: [transaction, ...state.recentTransactions,]
        }
    }
    if (ACTIONS.REMOVE_TRANSACTION === action.type) {
        const { id } = action;
        const incomes = stateToBe.incomes.filter(income => income.id !== id)
        const expenses = stateToBe.expenses.filter(expense => expense.id !== id)
        const recentTransactions = stateToBe.recentTransactions.filter(transaction => transaction.id !== id)
        stateToBe = {
            ...state,
            incomes,
            expenses,
            recentTransactions
        }

    }
    return formatState(stateToBe);
}