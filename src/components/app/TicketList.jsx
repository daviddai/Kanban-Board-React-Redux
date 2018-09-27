import React, {Component} from "react";
import PropTypes from "prop-types";
import {DropTarget} from "react-dnd";
import Ticket from "./Ticket";

const ticketListDropSpec = {

    drop(props, monitor) {

    }

};

const collectDrop = (connect, monitor) => {

    return {
        connectDropTarget: connect.dropTarget()
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
            connectDropTarget
        } = this.props;

        let ticketList = tickets.map(ticket => (
            <Ticket key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    description={ticket.description}
                    color={ticket.color}
                    tasks={ticket.tasks}
                    taskCallbacks={taskCallbacks}
            />
        ));

        return connectDropTarget(
            <div className="ticket-list px-1 text-center">
                <h3>{this.props.title}</h3>
                {ticketList}
            </div>
        );
    }

}

TicketList.propTypes = {
    tickets: PropTypes.array,
    taskCallbacks: PropTypes.object,
    connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget('card', ticketListDropSpec, collectDrop)(TicketList);