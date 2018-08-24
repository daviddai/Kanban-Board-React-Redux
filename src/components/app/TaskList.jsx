import React, {Component} from "react";
import Task from "./Task";

class TaskList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="task-list px-1 text-center">
                <h3>{this.props.title}</h3>
                <Task/>
                <Task/>
            </div>
        );
    }

}

export default TaskList;