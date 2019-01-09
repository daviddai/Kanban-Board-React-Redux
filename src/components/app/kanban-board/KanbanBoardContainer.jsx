import React, {Component} from "react";
import PropTypes from "prop-types";
import KanbanBoard from "./KanbanBoard";
import axios from "axios";
import update from 'react-addons-update';
import {TicketStatus} from "./ticket/TicketStatus";

import {connect} from "react-redux";

import {
    addTask,
    deleteTask,
    loadTickets,
    toggleTaskStatus,
    updateTaskName
} from "../../../actions/kanban-board/kanbanBoardAction";

const mapStateToProps = state => {
    return {
        tickets: state.tickets
    }
};

class ConnectedKanbanBoardContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadTickets();
    }

    findTicketIndex = (ticketId) => {
        return this.props.tickets.findIndex(ticket =>{
            return ticket.id == ticketId;
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
        this.props.addTask(ticketId, taskName);
    };

    changeTaskName = (ticketId, taskId, newTaskName) => {
        this.props.updateTaskName(ticketId, taskId, newTaskName);
    };

    deleteTask = (ticketId, taskId) => {
        this.props.deleteTask(ticketId, taskId);
    };

    toggleTask = (ticketId, taskId, taskNewStatus) => {
        this.props.toggleTaskStatus(ticketId, taskId, taskNewStatus);
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
            axios.post('http://localhost:8083/ticket/update/status', {
                    ticketId: ticketId,
                    newTicketStatus: toStatus
                 })
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
            <KanbanBoard tickets={this.props.tickets}
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

ConnectedKanbanBoardContainer.propTypes = {
    tickets: PropTypes.array.isRequired
};

const KanbanBoardContainer = connect(mapStateToProps,
                                    {
                                        loadTickets,
                                        toggleTaskStatus,
                                        addTask,
                                        updateTaskName,
                                        deleteTask
                                    })(ConnectedKanbanBoardContainer);

export default KanbanBoardContainer;