import React, {Component} from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import KanbanBoardContainer from "./kanban-board/KanbanBoardContainer";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import TopNavBar from "../reusable/bar/top-bar/TopNavBar";

import "./app.css";

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

        return (
            <div className="app">
                <TopNavBar navItems={['MenuItem1', 'MenuItem2', 'MenuItem3', 'MenuItem4', 'MenuItem5']}/>
                <Router>
                    <Route path="/kanban" render={() => (<KanbanBoardContainer tickets={tickets} />)} />
                </Router>
            </div>
        );
    }

}

export default App;