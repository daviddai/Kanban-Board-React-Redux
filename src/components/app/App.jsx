import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import KanbanBoardContainer from "./kanban-board/KanbanBoardContainer";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./app.css";
import AppMenu from "./menu/AppMenu";
import DashboardContainer from "./dashboard/DashboardContainer";

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
                uri:'dashboard'
            },
            {
                id: 2,
                title: 'Boards',
                uri:'kanban'
            },
            {
                id: 3,
                title: 'Others',
                uri:'others'
            }
        ];

        return (
            <div className="app">
                <BrowserRouter>
                    <div>
                        <AppMenu menuItems={navItems}/>
                        <Switch>
                            <Route path="/kanban" render={() => (<KanbanBoardContainer tickets={tickets} />)} />
                            <Route path="/dashboard" component={DashboardContainer} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }

}

export default App;