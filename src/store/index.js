import { createStore, combineReducers } from "redux";
import * as allReducers from "./reducers";

const store = createStore(
    combineReducers(allReducers),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
