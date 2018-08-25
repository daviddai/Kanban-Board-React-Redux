import React, {Component} from "react";

class Task extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <input type="checkbox" className="mr-2"/>
                Task
                <i className="fa fa-close pl-2 text-danger" />
            </div>
        );
    }

}

export default Task;