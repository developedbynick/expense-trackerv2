import { combineReducers, createStore } from "redux";
import transactions from "./reducers/transactions";
export const store = createStore(combineReducers({
    transactions,
}))