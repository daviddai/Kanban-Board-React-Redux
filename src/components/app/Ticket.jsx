import React, {Component} from "react";
import PropTypes from "prop-types";
import {Card} from "../reusable/card/Card";
import {CardHeader} from "../reusable/card/CardHeader";
import {CardBody} from "../reusable/card/CardBody";
import {CardFooter} from "../reusable/card/CardFooter";
import TaskList from "./TaskList";
import marked from "marked";

class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetails: true
        };
    }

    checkInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.props.taskCallbacks.add(event.target.getAttribute('ticketid'), event.target.value);
            event.target.value = '';
        }
    };

    toggleTicketDetails = () => {
        this.setState({
           showDetails: !this.state.showDetails
        });
    };

    getTaskInputBox = (ticketId) => (
        <div className="pull-left mt-2 task-input-box">
            <input className="task-input-field"
                   placeholder="type and enter to add new task"
                   onKeyPress={this.checkInputKeyPress}
                   ticketid={ticketId}
            />
        </div>
    );

    getTicketDetails = (ticketId) => (
        <React.Fragment>
            <CardBody className="border-top-0 py-0">
                <div className="text-left">
                    <p dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
                </div>
            </CardBody>
            <CardFooter className="task-list-top-border ticket-color">
                <div>
                    <TaskList ticketId={this.props.id} tasks={this.props.tasks}/>
                    {this.getTaskInputBox(ticketId)}
                </div>
            </CardFooter>
        </React.Fragment>
    );

    render() {
        let ticketDetails;

        const ticketLeftSideStyle = {
            borderLeft: this.props.color + " solid thick"
        };

        if (this.state.showDetails) {
            ticketDetails = this.getTicketDetails(this.props.id);
        }

        return (
            <Card className="mb-2 rounded-0 border-top-0 border-right-0 border-bottom-0" style={ticketLeftSideStyle}>
                <CardHeader className="border-bottom-0 ticket-color">
                    <h6 className="pull-left">
                        <i className={`fa ${this.state.showDetails ? 'fa-angle-down' : 'fa-angle-right'} pr-2 font-weight-bold`}
                           onClick={this.toggleTicketDetails}
                        />
                        {this.props.title}
                    </h6>
                </CardHeader>
                {ticketDetails}
            </Card>
        );
    }

}

Ticket.propTypes = {
    id: PropTypes.number,
    color: PropTypes.string.isRequired,
    description: PropTypes.string,
    tasks: PropTypes.array,
    title: PropTypes.string.isRequired,
    taskCallbacks: PropTypes.object
};

export default Ticket;