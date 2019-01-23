import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import KanbanBoardContainer from "./kanban-board/KanbanBoardContainer";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./app.css";
import AppMenu from "./menu/AppMenu";
import DashboardContainer from "./dashboard/DashboardContainer";
import UserLoginPage from "./user/login/UserLoginPage";
import {PrivateRoute} from "../reusable/route/PrivateRoute";

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <AppMenu />
                    <Switch>
                        <Route path="/login"
                               component={UserLoginPage}
                        />
                        <PrivateRoute path="/kanban"
                                      component={KanbanBoardContainer}
                        />
                        <PrivateRoute path="/dashboard"
                                      component={DashboardContainer}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }

}

export default App;