import React, {Component} from "react";
import KanbanBoard from "./KanbanBoard";
import update from 'react-addons-update';

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
        const ticketIndex = this.state.tickets.findIndex(ticket => {
           return ticket.id == ticketId;
        });

        if (ticketIndex != -1) {
            const newTask = {
                id: this.state.tickets[ticketIndex].tasks.length + 1,
                name: taskName,
                done: false
            };

            const newTickets = update(this.state.tickets, {
                [ticketIndex]: {
                    tasks: {$push: [newTask]}
                }
            });

            this.setState({
                tickets: newTickets
            });
        }
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