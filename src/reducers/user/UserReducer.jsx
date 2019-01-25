import update from "react-addons-update";

import {USER_LOGIN} from "../../constants/ActionTypes";

const userReducer = (state = {user: {isAuthenticated: false}}, action) => {

    const payload = action.payload;

    switch (action.type) {
        case USER_LOGIN:
            return {user: updateUser(state.user, payload)};
        default:
            return state;
    }

};

const updateUser = (user, userLoginResponse) => {
    if (userLoginResponse.succeed) {
        localStorage.setItem("user", JSON.stringify(userLoginResponse));

        return update(user, {
            isAuthenticated: {
                $apply: () => {
                    return userLoginResponse.succeed
                }
            }
        });
    } else {
        return state;
    }
};


export default userReducer;