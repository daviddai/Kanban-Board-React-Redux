import {createStore} from "redux";

import kanbanReducer from "../reducers/kandan-board/KanbanReducer";

const store = createStore(
    kanbanReducer
);

export default store;