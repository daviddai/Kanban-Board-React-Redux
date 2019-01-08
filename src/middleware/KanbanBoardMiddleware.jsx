import {LOAD_TICKETS, TOGGLE_TASK_STATUS} from "../constants/ActionTypes";


export const kanbanBoardMiddleware = ({dispatch}) => {
    return (next) => {
        return (action) => {
            switch (action.type) {
                case LOAD_TICKETS:
                    return next(action);
                case TOGGLE_TASK_STATUS:
                    return next(action);
                default:
                    action.payload = [];
                    return next(action);
            }
        };
    };
};
