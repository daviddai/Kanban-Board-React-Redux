import React, {Component} from "react";
import {Col, Row} from "react-grid-system";
import PropTypes from "prop-types";
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import "./style/kanban-board.css";
import TicketList from "./ticket/TicketList";
import {TicketStatus} from "./ticket/TicketStatus";

class KanbanBoard extends Component {

    constructor(props) {
        super(props);
    }

    getColumnOrderSortedByTicketStatus = (
        [
            TicketStatus.todo,
            TicketStatus.inProgress,
            TicketStatus.finished
        ]
    );

    render() {
        return (
            <div className="kanban-board-container">
                <Row className="kanban-board-row">
                    {
                        this.getColumnOrderSortedByTicketStatus.map((status, i) => (
                            <Col key={i} className="kanban-board-column kanban-board-column-separator">
                                <TicketList status={status.code}
                                            title={status.text}
                                            tickets={this.props.tickets.filter(ticket => ticket.status.code === status.code)}
                                            color={status.color}
                                            taskCallbacks={this.props.taskCallbacks}
                                />
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
    }

}

KanbanBoard.propTypes = {
    tickets: PropTypes.array,
    taskCallbacks: PropTypes.object
};

export default DragDropContext(HTML5Backend)(KanbanBoard);