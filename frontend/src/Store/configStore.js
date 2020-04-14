import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunk from "redux-thunk";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import reducerUser from "./Reducer/reducerUser";
import reducerPublications from "./Reducer/reducerPublications";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    users: reducerUser,
    publications: reducerPublications
});

const middleware = [
    thunk,
    routerMiddleware(history)
];
const persistedSate = loadFromLocalStorage();

const store = createStore(rootReducer, persistedSate, applyMiddleware(...middleware));
store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    });
});
export default store;