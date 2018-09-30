import React, {Component} from "react";
import PropTypes from "prop-types";
import {DropTarget} from "react-dnd";
import Ticket from "./Ticket";

const ticketListDropSpec = {

    hover(props, monitor) {},

    drop(props, monitor) {
        const ticketId = monitor.getItem()['id'];
        const oldStatus = monitor.getItem()['status'];
        const newStatus = props.title;
        props.taskCallbacks.updateTicketStatus(ticketId, oldStatus, newStatus);
    }

};

const collectDrop = (connect, monitor) => {

    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }

};

class TicketList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            tickets,
            taskCallbacks,
            connectDropTarget,
            isOver
        } = this.props;

        let ticketList = tickets.map(ticket => (
            <Ticket key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    description={ticket.description}
                    status={ticket.status}
                    color={ticket.color}
                    tasks={ticket.tasks}
                    taskCallbacks={taskCallbacks}
            />
        ));

        return connectDropTarget(
            <div className={`ticket-list px-1 text-center ${isOver ? "ticket-list-hover-border":""}`}>
                <h3>{this.props.title}</h3>
                {ticketList}
            </div>
        );
    }

}

TicketList.propTypes = {
    title: PropTypes.string,
    tickets: PropTypes.array,
    taskCallbacks: PropTypes.object,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
};

export default DropTarget('card', ticketListDropSpec, collectDrop)(TicketList);