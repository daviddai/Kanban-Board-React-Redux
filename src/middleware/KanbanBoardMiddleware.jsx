import {LOAD_TICKETS} from "../constants/ActionTypes";


export const kanbanBoardMiddleware = ({dispatch}) => {
    return (next) => {
        return (action) => {
            switch (action.type) {
                case LOAD_TICKETS:
                    return next(action);
                default:
                    action.payload = [];
                    return next(action);
            }
        };
    };
};
