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

    findTicketIndex = (ticketId) => {
        return this.state.tickets.findIndex(ticket =>{
            return ticket.id == ticketId;
        });
    };

    findTaskIndex = (taskId, ticket) => {
        return ticket.tasks.findIndex(task => {
            return task.id == taskId;
        });
    };

    addTask = (ticketId, taskName) => {
        const ticketIndex = this.findTicketIndex(ticketId);

        if (ticketIndex != -1) {
            const newTask = {
                id: this.state.tickets[ticketIndex].tasks.length + 1,
                name: taskName,
                done: false
            };

            const newTickets = update(this.state.tickets, {
                [ticketIndex]: {
                    tasks: { $push: [newTask] }
                }
            });

            this.setState({
                tickets: newTickets
            });
        }
    };

    deleteTask = (ticketId, taskId) => {

    };

    toggleTask = (ticketId, taskId) => {
        const ticketIndex = this.findTicketIndex(ticketId);
        const taskIndex = this.findTaskIndex(this.state.tickets[ticketIndex], taskId);
        const newTickets = update(this.state.tickets, {
            [ticketIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: done => {
                                return !done;
                            }
                        }
                    }
                }
            }
        });

        this.setState({
            tickets: newTickets
        });

        console.log(this.state.tickets);
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