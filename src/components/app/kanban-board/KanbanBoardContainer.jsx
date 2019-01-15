import React, {Component} from "react";
import PropTypes from "prop-types";
import KanbanBoard from "./KanbanBoard";
import update from 'react-addons-update';

import {connect} from "react-redux";

import {
    addTask,
    deleteTask,
    loadTickets,
    toggleTaskStatus,
    updateTaskName,
    updateTicketStatus
} from "../../../actions/kanban-board/kanbanBoardAction";

const mapStateToProps = state => {
    // https://stackoverflow.com/questions/35402389/combinereducers-causes-code-to-break
    return {
        tickets: state.kanbanBoardReducer.tickets
    }
};

class ConnectedKanbanBoardContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadTickets();
    }

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

    updateTicketStatus = (ticketId, fromStatus, toStatus) => {
        this.props.updateTicketStatus(ticketId, toStatus);
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
                                        updateTicketStatus,
                                        loadTickets,
                                        toggleTaskStatus,
                                        addTask,
                                        updateTaskName,
                                        deleteTask
                                    })(ConnectedKanbanBoardContainer);

export default KanbanBoardContainer;