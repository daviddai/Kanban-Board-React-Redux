import React, {Component} from "react";
import KanbanBoard from "./KanbanBoard";
import axios from "axios";
import update from 'react-addons-update';

class KanbanBoardContainer extends  Component {

    constructor(props) {
        super(props);
        this.state = {
            tickets: []
        };
    }

    loadTickets = () => {
        axios.get("http://localhost:8083/ticket/all")
             .then(response => {
                 let tickets = response.data.map(ticket => {
                    if (ticket.status === 'todo') {
                        ticket.color = '#3A7E28'
                    } else if (ticket.status === 'in-progress') {
                        ticket.color = '#BD8D31';
                    } else {
                        ticket.color = '';
                    }
                    return ticket;
                 });

                 this.setState(
                     {
                         "tickets": tickets
                     })
                 ;
             })
             .catch(error => {
                console.log(error);
             });
    };

    componentDidMount() {
        this.loadTickets();
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
        const ticketIndex = this.findTicketIndex(ticketId);
        const taskIndex = this.findTaskIndex(taskId, this.state.tickets[ticketIndex])

        if (ticketIndex != -1 && taskIndex != -1) {
            const newTickets = update(this.state.tickets, {
                [ticketIndex]: {
                    tasks: {
                        $splice: [[taskIndex, 1]]
                    }
                }
            });

            this.setState({
                tickets: newTickets
            });
        }
    };

    toggleTask = (ticketId, taskId) => {
        const ticketIndex = this.findTicketIndex(ticketId);
        const taskIndex = this.findTaskIndex(taskId, this.state.tickets[ticketIndex]);

        if (ticketIndex != -1 && taskIndex != -1) {
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
        }
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