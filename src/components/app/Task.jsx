import React, {Component} from "react";

class Task extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="text-left">
                <input type="checkbox"
                       className="mr-2"
                       defaultChecked={this.props.done}
                />
                {this.props.name}
                <i className="fa fa-close pl-2 text-danger" />
            </div>
        );
    }

}

export default Task;