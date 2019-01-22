import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import KanbanBoardContainer from "./kanban-board/KanbanBoardContainer";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./app.css";
import AppMenu from "./menu/AppMenu";
import DashboardContainer from "./dashboard/DashboardContainer";

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
                        <Route path="/kanban"
                               render={
                                   () => (<KanbanBoardContainer />)
                               }
                        />
                        <Route path="/dashboard" component={DashboardContainer}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }

}

export default App;