import {applyMiddleware, createStore} from "redux";

import thunk from "redux-thunk";

import kanbanBoardReducer from "../reducers/kandan-board/KanbanBoardReducer";
import {kanbanBoardMiddleware} from "../middleware/KanbanBoardMiddleware";

const store = createStore(
    kanbanBoardReducer,
    applyMiddleware(kanbanBoardMiddleware, thunk)
);

export default store;