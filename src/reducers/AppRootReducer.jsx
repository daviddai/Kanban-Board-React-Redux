import {combineReducers} from "redux";

import kanbanBoardReducer from "./kandan-board/KanbanBoardReducer";
import appMenuReducer from "./app-menu/AppMenuReducer";

const appRootReducer = combineReducers({kanbanBoardReducer, appMenuReducer});

export default appRootReducer;