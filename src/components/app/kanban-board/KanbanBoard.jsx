import React, {Component} from "react";
import {Row, Col} from "react-grid-system";
import PropTypes from "prop-types";
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
                        <TicketList status="todo"
                                    title="To Do"
                                    tickets={this.props.tickets.filter(
                                        ticket => ticket.status === 'todo'
                                    )}
                                    taskCallbacks={this.props.taskCallbacks}
                        />
                    </Col>
                    <Col className="kanban-board-column kanban-board-column-separator">
                        <TicketList status="in-progress"
                                    title="In Progress"
                                    tickets={this.props.tickets.filter(
                                        ticket => ticket.status === 'in-progress'
                                    )}
                                    taskCallbacks={this.props.taskCallbacks}
                        />
                    </Col>
                    <Col className="kanban-board-column kanban-board-column-separator">
                        <TicketList status="finished"
                                    title="Finished"
                                    tickets={this.props.tickets.filter(
                                        ticket => ticket.status === 'finished'
                                    )}
                                    taskCallbacks={this.props.taskCallbacks}
                        />
                    </Col>
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