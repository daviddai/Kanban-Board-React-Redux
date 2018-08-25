import React, {Component} from "react";
import {Row, Col} from "react-grid-system";

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
                        <TicketList title="To Do"/>
                    </Col>
                    <Col className="kanban-board-column kanban-board-column-separator">
                        <TicketList title="In Progress"/>
                    </Col>
                    <Col className="kanban-board-column kanban-board-column-separator">
                        <TicketList title="Finished"/>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default KanbanBoard;