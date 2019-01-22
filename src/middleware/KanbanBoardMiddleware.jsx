import {
    ADD_TASK,
    ADD_TICKET,
    CHANGE_MENU_ITEM,
    DELETE_TASK,
    LOAD_MENU_ITEMS,
    LOAD_TICKETS,
    TOGGLE_TASK_STATUS,
    UPDATE_TASK_NAME,
    UPDATE_TICKET_STATUS
} from "../constants/ActionTypes";


export const kanbanBoardMiddleware = ({dispatch}) => {
    return (next) => {
        return (action) => {
            switch (action.type) {
                case ADD_TICKET:
                case LOAD_TICKETS:
                case UPDATE_TICKET_STATUS:
                case ADD_TASK:
                case UPDATE_TASK_NAME:
                case TOGGLE_TASK_STATUS:
                case DELETE_TASK:
                case LOAD_MENU_ITEMS:
                case CHANGE_MENU_ITEM:
                    return next(action);
                default:
                    action.payload = [];
                    return next(action);
            }
        };
    };
};
