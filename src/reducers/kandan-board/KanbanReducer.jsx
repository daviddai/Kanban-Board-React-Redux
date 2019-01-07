import {ADD_TICKET, LOAD_TICKETS} from "../../constants/ActionTypes";

const kanbanReducer = (state = {ticket: []}, action) => {
    switch (action.type) {
        case ADD_TICKET:
        case LOAD_TICKETS:
    }
};

export default kanbanReducer;