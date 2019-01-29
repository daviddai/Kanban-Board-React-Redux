import axios from "axios";

import {LOAD_MENU_ITEMS, SELECT_MENU_ITEM} from "../../constants/ActionTypes";

const menuItems = [
    {
        id: 1,
        title: 'Dashboards',
        uri:'dashboard',
        type: 'link'
    },
    {
        id: 2,
        title: 'Boards',
        uri:'kanban',
        type: 'link'
    },
    {
        id: 4,
        name: 'Create',
        type: 'button'
    }
];

export const changeAppMenuItem = (menuItemId) => dispatch => {
    dispatch({
        type: SELECT_MENU_ITEM,
        payload: {
            menuItemId: menuItemId
        }
    });
};

export const loadAppMenuItems = (highlightMenuItem) => dispatch => {
    return axios.get("mockUrl")
        .then(response => {

        })
        .catch(error => {
            console.log(error);

            dispatch({
                type: LOAD_MENU_ITEMS,
                payload: {
                    menuItems: menuItems
                }
            });

            highlightMenuItem(getMenuItemIdFromURI(menuItems));
        });
};

const getMenuItemIdFromURI = (menuItems) => {
    const uri = window.location.pathname;
    return menuItems.find(item => '/' + item.uri === uri);
};