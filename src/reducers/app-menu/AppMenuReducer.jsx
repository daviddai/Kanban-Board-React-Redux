import {LOAD_MENU_ITEMS, SELECT_MENU_ITEM} from "../../constants/ActionTypes";

const appMenuReducer = (state = {menuItems: []}, action) => {
    switch (action.type) {
        case LOAD_MENU_ITEMS:
            return action.payload;
        case SELECT_MENU_ITEM:
            return {
                ...state,
                currentMenuItem: getMenuItem(state.menuItems, action.payload.menuItemId)
            };
        default:
            return state;
    }
};

const getMenuItem = (menuItems, menuItemId) => {
    return menuItems.find(menuItem => menuItem.id == menuItemId);
};

export default appMenuReducer;