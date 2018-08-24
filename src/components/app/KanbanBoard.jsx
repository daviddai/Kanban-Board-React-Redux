import React, {Component} from "react";
import {Row, Col} from "react-grid-system";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./kanban-board.css";
import TaskList from "./TaskList";

class KanbanBoard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="kanban-board-container">
                <Row className="kanban-board-row">
                    <Col className="kanban-board-column kanban-board-column-separator">
                        <TaskList title="To Do"/>
                    </Col>
                    <Col className="kanban-board-column kanban-board-column-separator">
                        <TaskList title="In Progress"/>
                    </Col>
                    <Col className="kanban-board-column kanban-board-column-separator">
                        <TaskList title="Finished"/>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default KanbanBoard;