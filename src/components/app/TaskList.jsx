import React, {Component} from "react";
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
                  done={task.done}/>
        ));

        return (
            <div>
                {tasks}
            </div>
        );
    }

}

export default TaskList;