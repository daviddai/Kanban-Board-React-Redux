import {CHANGE_MENU_ITEM, LOAD_MENU_ITEMS} from "../../constants/ActionTypes";

const appMenuReducer = (state = {menuItems: [], currentSelectedMenuItemId: -1}, action) => {
    switch (action.type) {
        case LOAD_MENU_ITEMS:
            return action.payload;
        case CHANGE_MENU_ITEM:
            console.log("change menu item");
            return action.payload;
        default:
            return state;
    }
};

export default appMenuReducer;