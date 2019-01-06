import React, {Component} from "react";
import PropTypes from "prop-types";
import update from 'react-addons-update';
import validator from "validator";

import {CardHeader} from "../../../reusable/card/CardHeader";
import {CardBody} from "../../../reusable/card/CardBody";
import {CardFooter} from "../../../reusable/card/CardFooter";
import {Card} from "../../../reusable/card/Card";
import FormValidator from "../../../reusable/form/validator/FormValidator";

export default class TicketForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ticket: {
                title: "",
                description: "",
                tasks: []
            },
            ticketFormValidation: {
                isFormValid: false,
                validationResults: {
                    'title': {
                        isValid: true,
                        message: ''
                    }
                }
            }
        };

        this.validations = [
            {
                field: 'title',
                method: validator.isEmpty,
                validWhen: false,
                message: 'Ticket title cannot be empty.'
            }
        ];

        this.ticketFormValidator = new FormValidator(this.validations);
    }

    createNewTicket = (event) => {
        event.preventDefault();

        this.ticketFormValidator.validate(this.state.ticket);
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

    inputOnChangeHandler = (event) => {
        let newTicket;
        const newVal = event.target.value;

        switch (event.target.id) {
            case 'title':
                newTicket = update(this.state.ticket, {
                   title: {
                       $apply: () => {
                           return newVal;
                       }
                   }
                });
                break;
            case 'description':
                newTicket = update(this.state.ticket, {
                    description: {
                        $apply: () => {
                            return newVal;
                        }
                    }
                });
                break;
        }

        const validationResults = this.ticketFormValidator.validate(newTicket);

        this.setState({
            ticket: newTicket,
            ticketFormValidation: validationResults
        });
    };

    render() {
        const tasks = this.state.ticket.tasks.map((task, i) => (
            <li value={"Task" + i}>{task}</li>
        ));

        const isTicketFormValid = this.state.ticketFormValidation.isFormValid;
        const validationResults = this.state.ticketFormValidation.validationResults;

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
                                <input id="title"
                                       type="text"
                                       className="form-control"
                                       onChange={this.inputOnChangeHandler}
                                />
                                <label style={{ 'display': validationResults.title.isValid ? 'none' : 'inline'}}>
                                    <div className="mt-1 text-danger">
                                        <span className="fa fa-exclamation-circle mr-1" />
                                        {this.state.ticketFormValidation.validationResults.title.message}
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-3 col-form-label">Description:</label>
                            <div className="col-9">
                                <textarea id="description"
                                          className="form-control"
                                          onChange={this.inputOnChangeHandler}
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
                                   disabled={!isTicketFormValid}
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