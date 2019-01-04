import React, {Component} from "react";
import PropTypes from "prop-types";
import update from 'react-addons-update';
import {CardHeader} from "../../../reusable/card/CardHeader";
import {CardBody} from "../../../reusable/card/CardBody";
import {CardFooter} from "../../../reusable/card/CardFooter";
import {Card} from "../../../reusable/card/Card";

export default class TicketForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ticket: {
                title: "",
                description: "",
                tasks: []
            }
        };
    }

    createNewTicket = (event) => {
        event.preventDefault();

        const ticketTitle = document.getElementById("ticketTitle");
        const ticketDescription = document.getElementById("ticketDescription");
        // const tasks = document.getElementById("tasks").childNodes.forEach(value => {console.log(value)});
        const tasks = [];
        document.getElementById("tasks")
                .childNodes
                .forEach(childNode => tasks.push(childNode.textContent));
    };

    addNewTaskToTicket = (event) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            const newTicket = update(this.state.ticket, {
                tasks: {
                    $push: [event.target.value]
                }
            });

            this.setState({
                ticket: newTicket
            });

            event.target.value = '';
        }
    };

    cancelNewTicket = () => {
        this.props.ticketFormCancelledCallback();
    };

    render() {
        const tasks = this.state.ticket.tasks.map((task, i) => (
            <li value={"Task" + i}>{task}</li>
        ));

        return (
            <form onSubmit={this.createNewTicket}>
                <Card>
                    <CardHeader>
                        <h3>Create New Ticket</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="form-group row">
                            <label className="col-3 col-form-label">Title:</label>
                            <div className="col-9">
                                <input id="ticketTitle"
                                       className="form-control"
                                       type="text"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-3 col-form-label">Description:</label>
                            <div className="col-9">
                                <textarea id="ticketDescription"
                                          className="form-control"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-3 col-form-label">Tasks:</label>
                            <div className="col-9">
                                <ul id="tasks" className="pl-3">
                                    {tasks}
                                </ul>
                                <input id="taskInput"
                                       className="task-input-field"
                                       placeholder="type and enter to add new task"
                                       onKeyUp={this.addNewTaskToTicket}
                                />
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="pull-right">
                            <input type="submit"
                                   value="Create"
                                   className="btn btn-success"
                            />
                            <input type="button"
                                   value="Cancel"
                                   className="btn btn-secondary ml-2"
                                   onClick={this.cancelNewTicket}
                            />
                        </div>
                    </CardFooter>
                </Card>
            </form>
        );
    }

}

TicketForm.propTypes = {
    ticketFormCancelledCallback: PropTypes.func
};