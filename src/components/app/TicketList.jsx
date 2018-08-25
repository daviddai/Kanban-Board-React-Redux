import React, {Component} from "react";
import Ticket from "./Ticket";

class TicketList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ticket-list px-1 text-center">
                <h3>{this.props.title}</h3>
                <Ticket/>
                <Ticket/>
            </div>
        );
    }

}

export default TicketList;