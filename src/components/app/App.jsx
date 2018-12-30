import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import KanbanBoardContainer from "./kanban-board/KanbanBoardContainer";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./app.css";
import AppMenu from "./menu/AppMenu";
import DashboardContainer from "./dashboard/DashboardContainer";
import {TicketStatus} from "./kanban-board/ticket/TicketStatus";

class App extends Component {

    render() {
        let tickets = [
            {
                id: 1,
                title: "Read the Book",
                description: "I should read the **whole** book",
                status: TicketStatus.todo,
                tasks: []
            },
            {
                id: 2,
                title: "Write some code",
                description: "Code along with the samples in the book. The complete source can be found at [github](https://github.com/pro-react)",
                status: TicketStatus.inProgress,
                tasks: [
                    {id: 1, name: "ContactList Example", done: true},
                    {id: 2, name: "Kanban Example", done: false},
                    {id: 3, name: "My own experiments", done: false}
                ]
            }
        ];

        let navItems = [
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

        return (
            <BrowserRouter>
                <div className="app">
                    <AppMenu menuItems={navItems}/>
                    <Switch>
                        <Route path="/kanban" render={() => (<KanbanBoardContainer tickets={tickets} />)} />
                        <Route path="/dashboard" component={DashboardContainer} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }

}

export default App;