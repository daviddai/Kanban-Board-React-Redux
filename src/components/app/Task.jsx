import React, {Component} from "react";
import {Card} from "../reusable/card/Card";
import {CardHeader} from "../reusable/card/CardHeader";
import {CardBody} from "../reusable/card/CardBody";

class Task extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="mb-2">
                <CardHeader>
                    <h4 className="pull-left">Card Title</h4>
                </CardHeader>
                <CardBody>
                    <div className="pull-left">
                        Card Body
                    </div>
                </CardBody>
            </Card>
        );
    }

}

export default Task;