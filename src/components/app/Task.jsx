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
                <CardHeader className="border-bottom-0">
                    <h4 className="pull-left">Card Title</h4>
                </CardHeader>
                <CardBody className="border-top-0">
                    <div className="pull-left">
                        Card Body
                    </div>
                </CardBody>
            </Card>
        );
    }

}

export default Task;