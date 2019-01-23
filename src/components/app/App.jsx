import React, {Component} from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import KanbanBoardContainer from "./kanban-board/KanbanBoardContainer";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./app.css";
import AppMenu from "./menu/AppMenu";
import DashboardContainer from "./dashboard/DashboardContainer";
import UserLoginPage from "./user/login/UserLoginPage";

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let allRoutesToLogin = null;

        if (localStorage.getItem("user") == null) {
            allRoutesToLogin = <Redirect to={{ pathname: "/login" }}/>
        }

        return (
            <BrowserRouter>
                <div className="app">
                    <AppMenu />
                    <Switch>
                        <Route path="/login"
                               component={UserLoginPage}
                        />
                        {allRoutesToLogin}
                        <Route path="/kanban"
                               render={
                                   () => (<KanbanBoardContainer />)
                               }
                        />
                        <Route path="/dashboard"
                               component={DashboardContainer}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }

}

export default App;