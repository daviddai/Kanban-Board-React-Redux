import React, {Component} from "react";
import PropTypes from "prop-types";

class Task extends Component {

    constructor(props) {
        super(props);
    }

    toggleTask = () => {
        this.props.taskCallbacks.toggle(this.props.ticketId, this.props.id);
    };

    render() {
        return (
            <div className="text-left">
                <input type="checkbox"
                       className="mr-2"
                       defaultChecked={this.props.done}
                       onClick={this.toggleTask}
                />
                {this.props.name}
                <i className="fa fa-close pl-2 text-danger" />
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