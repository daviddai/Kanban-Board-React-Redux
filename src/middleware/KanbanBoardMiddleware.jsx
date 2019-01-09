import {
    ADD_TASK,
    DELETE_TASK,
    LOAD_TICKETS,
    TOGGLE_TASK_STATUS,
    UPDATE_TASK_NAME,
    UPDATE_TICKET_STATUS
} from "../constants/ActionTypes";


export const kanbanBoardMiddleware = ({dispatch}) => {
    return (next) => {
        return (action) => {
            switch (action.type) {
                case LOAD_TICKETS:
                case UPDATE_TICKET_STATUS:
                case ADD_TASK:
                case UPDATE_TASK_NAME:
                case TOGGLE_TASK_STATUS:
                case DELETE_TASK:
                    return next(action);
                default:
                    action.payload = [];
                    return next(action);
            }
        };
    };
};
