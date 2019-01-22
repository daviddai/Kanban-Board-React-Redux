import {LOAD_MENU_ITEMS} from "../../constants/ActionTypes";

const appMenuReducer = (state = {menuItems: []}, action) => {
    switch (action.type) {
        case LOAD_MENU_ITEMS:
            return action.payload;
        default:
            return state;
    }
};

export default appMenuReducer;