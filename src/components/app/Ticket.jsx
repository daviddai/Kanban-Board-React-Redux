import React, {Component} from "react";
import {Card} from "../reusable/card/Card";
import {CardHeader} from "../reusable/card/CardHeader";
import {CardBody} from "../reusable/card/CardBody";
import {CardFooter} from "../reusable/card/CardFooter";
import Task from "./Task";

class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetails: true
        };
    }

    handleArrowClicked = () => {
        this.setState({
           showDetails: !this.state.showDetails
        });
    };

    render() {
        let ticketDetails;

        if (this.state.showDetails) {
            ticketDetails = (
                <React.Fragment>
                    <CardBody className="border-top-0">
                        <div className="pull-left">
                            Card Body
                        </div>
                    </CardBody>
                    <CardFooter className="task-list-top-border ticket-color">
                        <div className="pull-left">
                            <Task/>
                            <Task/>
                        </div>
                    </CardFooter>
                </React.Fragment>
            );
        }

        return (
            <Card className="mb-2 rounded-0">
                <CardHeader className="border-bottom-0 ticket-color">
                    <h6 className="pull-left">
                        <i className={`fa ${this.state.showDetails ? 'fa-angle-down' : 'fa-angle-right'} pr-2 font-weight-bold`}
                           onClick={this.handleArrowClicked}
                        />
                        Card Title
                    </h6>
                </CardHeader>
                {ticketDetails}
            </Card>
        );
    }

}

export default Ticket;