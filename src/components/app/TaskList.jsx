import React, {Component} from "react";
import PropTypes from "prop-types";
import Task from "./Task";

class TaskList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let tasks = this.props.tasks.map(task => (
            <Task key={task.id}
                  id={task.id}
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
    tasks: PropTypes.array,
    taskCallbacks: PropTypes.object
};

export default TaskList;