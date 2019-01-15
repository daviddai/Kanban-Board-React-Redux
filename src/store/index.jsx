import {applyMiddleware, createStore} from "redux";

import thunk from "redux-thunk";

import {kanbanBoardMiddleware} from "../middleware/KanbanBoardMiddleware";

import appRootReducer from "../reducers/AppRootReducer";

const store = createStore(
    appRootReducer,
    applyMiddleware(kanbanBoardMiddleware, thunk)
);

export default store;