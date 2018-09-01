import React, {Component} from "react";
import PropTypes from "prop-types";

class Task extends Component {

    constructor(props) {
        super(props);
    }

    toggleTask = () => {
        this.props.taskCallbacks.toggle(this.props.ticketId, this.props.id);
    };

    deleteTask = () => {
        this.props.taskCallbacks.delete(this.props.ticketId, this.props.id);
    };

    render() {
        const taskTextDecoration = {
            textDecoration: this.props.done ? 'line-through':'none'
        };

        return (
            <div className="text-left">
                <input type="checkbox"
                       className="mr-2"
                       defaultChecked={this.props.done}
                       onClick={this.toggleTask}
                />
                <label style={taskTextDecoration}>{this.props.name}</label>
                <i className="fa fa-close pl-2 text-danger icon"
                   onClick={this.deleteTask}
                />
            </div>
        );
    }

}

Task.propTypes = {
    id: PropTypes.number.isRequired,
    ticketId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    taskCallbacks: PropTypes.object
};

export default Task;