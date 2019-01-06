import React, {Component} from "react";
import KanbanBoard from "./KanbanBoard";
import axios from "axios";
import update from 'react-addons-update';
import {TicketStatus} from "./ticket/TicketStatus";

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
                    ticket.status = this.getTicketStatus(ticket.status);
                    return ticket;
                 });

                 this.setState(
                     {
                         "tickets": tickets
                     }
                 );
             })
             .catch(error => {
                console.log("KanbanBoardContainer: " + error.message);

                alert("Failed to connect to service!")

                // use fall back data
                this.setState(
                    {
                        "tickets": this.props.tickets
                    }
                );
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

    addTicket = (ticket) => {
        const newTickets = update(this.state.tickets, {
            $push: [ticket]
        });

        this.setState({
            tickets: newTickets
        });
    };

    addTask = (ticketId, taskName) => {
        const ticketIndex = this.findTicketIndex(ticketId);

        if (ticketIndex != -1) {
            let newTask = {
                id: -1,
                name: taskName,
                done: false,
                ticketId: ticketId
            };

            axios.post("http://localhost:8083/task/add", newTask)
                 .then(response => {
                     if (response.data.succeed) {
                         newTask.id = response.data.taskId;

                         const newTickets = update(this.state.tickets, {
                             [ticketIndex]: {
                                 tasks: { $push: [newTask] }
                             }
                         });

                         this.setState({
                             tickets: newTickets
                         });
                     }
                 })
                 .catch(error => {
                    console.log(error);
                 });
        }
    };

    changeTaskName = (ticketId, taskId, newTaskName) => {
        const ticketIndex = this.findTicketIndex(ticketId);
        const taskIndex = this.findTaskIndex(taskId, this.state.tickets[ticketIndex]);

        if (ticketIndex != -1 && taskIndex != -1) {
            const updateTaskNameRequest = {
                ticketId: ticketId,
                taskId: taskId,
                taskName: newTaskName
            };

            axios.post("http://localhost:8083/task/update/name", updateTaskNameRequest)
                 .then(response => {
                     if (response.data.succeed) {
                         const newTickets = update(this.state.tickets, {
                             [ticketIndex]: {
                                 tasks: {
                                     [taskIndex]: {
                                         name: {
                                             $apply: () => {
                                                 return newTaskName;
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
                 })
                 .catch(error => {
                     console.log(error);
                 });
        }
    };

    deleteTask = (ticketId, taskId) => {
        const ticketIndex = this.findTicketIndex(ticketId);
        const taskIndex = this.findTaskIndex(taskId, this.state.tickets[ticketIndex])

        if (ticketIndex != -1 && taskIndex != -1) {
            axios.post("http://localhost:8083/task/delete/" + ticketId + "/" + taskId)
                 .then(response => {
                     if (response.data.succeed) {
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
                 })
                 .catch(error => {
                     console.log(error);
                 });
        }
    };

    toggleTask = (ticketId, taskId) => {
        const ticketIndex = this.findTicketIndex(ticketId);
        const taskIndex = this.findTaskIndex(taskId, this.state.tickets[ticketIndex]);

        if (ticketIndex != -1 && taskIndex != -1) {
            const newStatus = !this.state.tickets[ticketIndex].tasks[taskIndex].done;

            axios.post("http://localhost:8083/task/update/status", {
                "ticketId": ticketId,
                "taskId": taskId,
                "done": newStatus
            }).then(response => {
                if (response.data.succeed) {
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

                    console.log(response.status);
                }
            }).catch(error => {
                console.log(error);
            });
        }
    };

    getTicketStatus = (status) => {
        switch (status) {
            case "todo": return TicketStatus.todo;
            case "in-progress": return TicketStatus.inProgress;
            case "finished": return TicketStatus.finished;
        }
    };

    updateTicketStatus = (ticketId, fromStatus, toStatus) => {
        const ticketIndex = this.findTicketIndex(ticketId);

        if (ticketIndex != -1) {
            let ticket = this.state.tickets[ticketIndex];
            ticket.status = toStatus;

            // todo: consider simplify request to contain only ticket id and new status
            axios.post('http://localhost:8083/ticket/update', ticket)
                 .then(response => {
                     if (response.status == 200) {
                         const newTickets = update(this.state.tickets, {
                             [ticketIndex]: {
                                 status: {
                                     $apply: () => {
                                         return this.getTicketStatus(toStatus)
                                     }
                                 }
                             }
                         });

                         this.setState({
                             tickets: newTickets
                         });
                     }
                 })
                 .catch(error => {
                    console.log(error);
                 });
        }
    };

    render() {
        return (
            <KanbanBoard tickets={this.state.tickets}
                         taskCallbacks={{
                             toggle: this.toggleTask,
                             add: this.addTask,
                             delete: this.deleteTask,
                             updateTicketStatus: this.updateTicketStatus,
                             changeTaskName: this.changeTaskName
                         }}
            />
        );
    }

}

export default KanbanBoardContainer;