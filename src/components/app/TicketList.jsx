import React, {Component} from "react";
import PropTypes from "prop-types";
import Ticket from "./Ticket";

class TicketList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let tickets = this.props.tickets.map(ticket => (
            <Ticket key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    description={ticket.description}
                    color={ticket.color}
                    tasks={ticket.tasks}
                    taskCallbacks={this.props.taskCallbacks}
            />
        ));

        return (
            <div className="ticket-list px-1 text-center">
                <h3>{this.props.title}</h3>
                {tickets}
            </div>
        );
    }

}

TicketList.propTypes = {
    tickets: PropTypes.array,
    taskCallbacks: PropTypes.object
};

export default TicketList;