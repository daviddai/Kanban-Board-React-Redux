import {ADD_TICKET, LOAD_TICKETS, TOGGLE_TASK_STATUS} from "../../constants/ActionTypes";

const kanbanReducer = (state = {tickets: []}, action) => {
    switch (action.type) {
        case ADD_TICKET:
        case LOAD_TICKETS: return {tickets: action.payload};
        case TOGGLE_TASK_STATUS:
        default: return state;
    }
};

export default kanbanReducer;