import React, {Component} from "react";
import PropTypes from "prop-types";

import EditInlineLabel from "../../../reusable/input/EditInlineLabel";

class Task extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };
    }

    toggleTask = () => {
        this.props.taskCallbacks.toggle(this.props.ticketId, this.props.id);
    };

    deleteTask = () => {
        this.props.taskCallbacks.delete(this.props.ticketId, this.props.id);
    };

    editInlineLabelStatusChangedHandler = (isEditing) => {
        this.setState({
            editing: isEditing
        });
    };

    render() {
        const taskTextDecoration = {
            textDecoration: this.props.done ? 'line-through':'none'
        };

        const checkBoxAndIconVisibility = this.state.editing ? 'none' : 'inline';

        return (
            <div className="text-left">
                <input type="checkbox"
                       className="mr-2"
                       style={{ 'display': checkBoxAndIconVisibility }}
                       defaultChecked={this.props.done}
                       onClick={this.toggleTask}
                />
                <EditInlineLabel text={this.props.name}
                                 textStyle={taskTextDecoration}
                                 statusChangedCallback={this.editInlineLabelStatusChangedHandler}
                />
                <i className="fa fa-close pl-2 text-danger icon"
                   style={{ 'display': checkBoxAndIconVisibility }}
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