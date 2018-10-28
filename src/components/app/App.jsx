import React, {Component} from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import KanbanBoardContainer from "./kanban-board/KanbanBoardContainer";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./app.css";
import AppMenu from "./menu/AppMenu";
import DashboardContainer from "./dashboard/DashboardContainer";
import {Switch} from "react-router";

class App extends Component {

    render() {
        let tickets = [{
            id: 1,
            title: "Read the Book",
            description: "I should read the **whole** book",
            color: '#BD8D31',
            status: "in-progress",
            tasks: []
        }, {
            id: 2,
            title: "Write some code",
            description: "Code along with the samples in the book. The complete source can be found at [github](https://github.com/pro-react)",
            color: '#3A7E28',
            status: "todo",
            tasks: [
                {id: 1, name: "ContactList Example", done: true},
                {id: 2, name: "Kanban Example", done: false},
                {id: 3, name: "My own experiments", done: false}
            ]
        }];

        let navItems = [
            {
                id: 1,
                title: 'Dashboards',
                url:'dashboard'
            },
            {
                id: 2,
                title: 'Boards',
                url:'kanban'
            },
            {
                id: 3,
                title: 'Others',
                url:'others'
            }
        ];

        return (
            <div className="app">
                <AppMenu menuItems={navItems}/>
                <Router>
                    <Switch>
                        <Route path="/kanban" render={() => (<KanbanBoardContainer tickets={tickets} />)} />
                        <Route path="/dashboard" component={DashboardContainer} />
                    </Switch>
                </Router>
            </div>
        );
    }

}

export default App;