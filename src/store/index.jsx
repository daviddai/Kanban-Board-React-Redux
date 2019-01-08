import {applyMiddleware, createStore} from "redux";

import thunk from "redux-thunk";

import kanbanReducer from "../reducers/kandan-board/KanbanReducer";
import {kanbanBoardMiddleware} from "../middleware/KanbanBoardMiddleware";

const store = createStore(
    kanbanReducer,
    applyMiddleware(kanbanBoardMiddleware, thunk)
);

export default store;