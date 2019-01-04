import React, {Component} from "react";
import PropTypes from "prop-types";
import Task from "./Task";

class TaskList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const tasks = this.props.tasks.map(task => (
            <Task key={task.id}
                  id={task.id}
                  ticketId={this.props.ticketId}
                  name={task.name}
                  done={task.done}
                  taskCallbacks={this.props.taskCallbacks}
            />
        ));

        return (
            <div>
                {tasks}
            </div>
        );
    }

}

TaskList.propTypes = {
    ticketId: PropTypes.number.isRequired,
    tasks: PropTypes.array,
    taskCallbacks: PropTypes.object
};

export default TaskList;