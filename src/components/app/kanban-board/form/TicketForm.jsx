import React, {Component} from "react";
import PropTypes from "prop-types";

import update from 'react-addons-update';
import validator from "validator";

import {connect} from "react-redux";

import {CardHeader} from "../../../reusable/card/CardHeader";
import {CardBody} from "../../../reusable/card/CardBody";
import {CardFooter} from "../../../reusable/card/CardFooter";
import {Card} from "../../../reusable/card/Card";
import FormValidator from "../../../reusable/form/validator/FormValidator";
import {addTicket} from "../../../../actions/kanban-board/kanbanBoardAction";
import {TicketStatus} from "../ticket/TicketStatus";

class ConnectedTicketForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ticket: {
                ticketTitle: "",
                ticketDescription: "",
                ticketStatus: TicketStatus.todo.code,
                taskNames: []
            },
            ticketFormValidation: {
                isFormValid: false,
                validationResults: {
                    'ticketTitle': {
                        isValid: true,
                        message: ''
                    }
                }
            }
        };

        this.validations = [
            {
                field: 'ticketTitle',
                method: validator.isEmpty,
                validWhen: false,
                message: 'Ticket title cannot be empty.'
            }
        ];

        this.ticketFormValidator = new FormValidator(this.validations);
    }

    createNewTicket = (event) => {
        event.preventDefault();

        const ticketFormValidation = this.ticketFormValidator.validate(this.state.ticket);

        this.setState({
            ticketFormValidation: ticketFormValidation
        });

        console.log(this.state.ticket);

        this.props.addTicket(this.state.ticket);
    };

    addNewTaskToTicket = (event) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            const newTicket = update(this.state.ticket, {
                taskNames: {
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
                   ticketTitle: {
                       $apply: () => {
                           return newVal;
                       }
                   }
                });
                break;
            case 'description':
                newTicket = update(this.state.ticket, {
                    ticketDescription: {
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

    formOnKeyPressedHandler = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    render() {
        const tasks = this.state.ticket.taskNames.map((task, i) => (
            <li key={i} value={"Task" + i}>{task}</li>
        ));

        const isTicketFormValid = this.state.ticketFormValidation.isFormValid;
        const validationResults = this.state.ticketFormValidation.validationResults;

        return (
            <form onSubmit={this.createNewTicket}
                  onKeyPress={this.formOnKeyPressedHandler}
            >
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
                                <label style={{ 'display': validationResults.ticketTitle.isValid ? 'none' : 'inline'}}>
                                    <div className="mt-1 text-danger">
                                        <span className="fa fa-exclamation-circle mr-1" />
                                        {this.state.ticketFormValidation.validationResults.ticketTitle.message}
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

ConnectedTicketForm.propTypes = {
    ticketFormCancelledCallback: PropTypes.func
};

const TicketForm = connect(null, {addTicket})(ConnectedTicketForm);

export default TicketForm;