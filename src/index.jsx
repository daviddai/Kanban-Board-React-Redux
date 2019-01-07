import React from "react";
import ReactDOM from "react-dom";

import {Provider} from "react-redux";
import store from "./store/index";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import App from "./components/app/App";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);