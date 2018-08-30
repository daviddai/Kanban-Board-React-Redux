import React, {Component} from "react";
import KanbanBoard from "./KanbanBoard";

class KanbanBoardContainer extends  Component {

    constructor(props) {
        super(props);
        this.state = {
            tickets: []
        };
    }

    componentDidMount() {
        this.setState({
            tickets: this.props.tickets
        });
    }

    addTask = (ticketId, taskName) => {
        console.log(ticketId + " " + taskName);
    };

    deleteTask = (ticketId, taskId, taskIndex) => {

    };

    toggleTask = (ticketId, taskId, taskIndex) => {

    };

    render() {
        return (
            <KanbanBoard tickets={this.state.tickets}
                         taskCallbacks={{
                             toggle: this.toggleTask,
                             add: this.addTask,
                             delete: this.deleteTask
                         }}
            />
        );
    }

}

export default KanbanBoardContainer;