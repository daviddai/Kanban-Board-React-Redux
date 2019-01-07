import {createStore} from "redux";

import kanbanReducer from "../store/index";

const store = createStore(
    kanbanReducer
);

export default store;