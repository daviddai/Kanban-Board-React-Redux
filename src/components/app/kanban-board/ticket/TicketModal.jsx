import React, {Component} from "react";
import PropTypes from "prop-types";

import Modal from "react-responsive-modal";

import {Card} from "../../../reusable/card/Card";
import {CardHeader} from "../../../reusable/card/CardHeader";
import {CardBody} from "../../../reusable/card/CardBody";
import {CardFooter} from "../../../reusable/card/CardFooter";

export default class TicketModal extends Component {

    constructor(props) {
        super(props);
    }

    notifyInvoker = () => {
        if (this.props.handleModalOnClose != null) {
            this.props.handleModalOnClose();
        }
    };

    closeModal = () => {
        this.notifyInvoker();
    };

    render() {
        const shouldOpen = this.props.showTicketModal;

        return (
            <Modal open={shouldOpen}
                   onClose={this.closeModal}
                   classNames={{modal: "create-ticket-modal"}}
                   showCloseIcon={false}
            >
                <form>
                    <Card>
                        <CardHeader>
                            <h3>Create New Ticket</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="form-group row">
                                <label className="col-2 col-form-label">Title:</label>
                                <div className="col-10">
                                    <input className="form-control"
                                           type="text"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-2 col-form-label">Description:</label>
                                <div className="col-10">
                                    <textarea className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-2 col-form-label">Tasks:</label>
                                <div className="col-10">
                                    <ul className="pl-3">
                                        <li>Task 1</li>
                                        <li>Task 2</li>
                                    </ul>
                                    <input className="task-input-field"
                                           placeholder="type and enter to add new task"
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
                            </div>
                        </CardFooter>
                    </Card>
                </form>
            </Modal>
        );
    }

}

TicketModal.propTypes = {
    showTicketModal: PropTypes.bool.isRequired,
    handleModalOnClose: PropTypes.func
};