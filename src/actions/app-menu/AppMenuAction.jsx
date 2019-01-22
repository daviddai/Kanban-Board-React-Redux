import axios from "axios";

import {CHANGE_MENU_ITEM, LOAD_MENU_ITEMS} from "../../constants/ActionTypes";

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
        id: 3,
        title: 'Others',
        uri:'others',
        type: 'link'
    },
    {
        id: 4,
        name: 'Create',
        type: 'button'
    }
];

export const loadAppMenuItems = () => {
    return (dispatch) => {
        return axios.get("mockUrl")
                    .then(response => {

                    })
                    .catch(error => {
                        console.log(error);

                        dispatch({
                            type: LOAD_MENU_ITEMS,
                            payload: {
                                menuItems: menuItems,
                                currentSelectedMenuItemId: getMenuItemIdFromURI(menuItems)
                            }
                        });
                    });
    };
};

export const highlightNewSelectedMenuItem = (menuItemId, dispatch) => {
    dispatch({
        type: CHANGE_MENU_ITEM,
        payload: {
            currentSelectedMenuItemId: menuItemId
        }
    });
};

const getMenuItemIdFromURI = (menuItems) => {
    const uri = window.location.pathname;
    return menuItems.find(item => '/' + item.uri === uri).id;
};