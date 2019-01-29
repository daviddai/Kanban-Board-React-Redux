import axios from "axios";
import {USER_LOGIN} from "../../constants/ActionTypes";

export const authenticateUser = user => dispatch => {
    return axios.post("mockUrl", user)
        .then(response => {

        })
        .catch(error => {
            console.log(error);

            dispatch({
                type: USER_LOGIN,
                payload: {
                    succeed: true
                }
            });
        });
};