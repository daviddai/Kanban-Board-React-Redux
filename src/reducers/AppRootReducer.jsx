import {combineReducers} from "redux";

import kanbanBoardReducer from "./kandan-board/KanbanBoardReducer";
import appMenuReducer from "./app-menu/AppMenuReducer";
import userReducer from "./user/UserReducer";

const appRootReducer = combineReducers({kanbanBoardReducer, appMenuReducer, userReducer});

export default appRootReducer;