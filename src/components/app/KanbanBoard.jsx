import React, {Component} from "react";
import {Row, Col} from "react-grid-system";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./kanban-board.css";
import TicketList from "./TicketList";

class KanbanBoard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="kanban-board-container">
                <Row className="kanban-board-row">
                    <Col className="kanban-board-column kanban-board-column-separator">
                        <TicketList title="To Do"
                                    tickets={this.props.tickets.filter(
                                        ticket => ticket.status === 'todo'
                                    )}
                        />
                    </Col>
                    <Col className="kanban-board-column kanban-board-column-separator">
                        <TicketList title="In Progress"
                                    tickets={this.props.tickets.filter(
                                        ticket => ticket.status === 'in-progress'
                                    )}
                        />
                    </Col>
                    <Col className="kanban-board-column kanban-board-column-separator">
                        <TicketList title="Finished"
                                    tickets={this.props.tickets.filter(
                                        ticket => ticket.status === 'finished'
                                    )}
                        />
                    </Col>
                </Row>
            </div>
        )
    }

}

KanbanBoard.propTypes = {
    tickets: PropTypes.array
};

export default KanbanBoard;