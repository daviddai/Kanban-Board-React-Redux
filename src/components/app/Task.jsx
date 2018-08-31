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
                />
                {this.props.name}
                <i className="fa fa-close pl-2 text-danger" onClick={this.toggleTask} />
            </div>
        );
    }

}

Task.propTypes = {
    id: PropTypes.number,
    ticketId: PropTypes.number,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    taskCallbacks: PropTypes.object
};

export default Task;