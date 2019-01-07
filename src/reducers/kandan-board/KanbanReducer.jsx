import {ADD_TICKET, LOAD_TICKETS} from "../../constants/ActionTypes";

const kanbanReducer = (state = {tickets: []}, action) => {
    switch (action.type) {
        case ADD_TICKET:
        case LOAD_TICKETS: return {tickets: action.payload};
        default: return state;
    }
};

export default kanbanReducer;