import React, {Component} from "react";
import PropTypes from "prop-types";

import Modal from "react-responsive-modal";

import {Card} from "../../../reusable/card/Card";
import {CardHeader} from "../../../reusable/card/CardHeader";
import {CardBody} from "../../../reusable/card/CardBody";

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
                   styles="create-ticket-modal"
                   showCloseIcon={false}
            >
                <form>
                    <Card>
                        <CardHeader>
                            <h3>Create New Ticket</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="form-group row">
                                <label htmlFor="example-text-input" className="col-2 col-form-label">Text</label>
                                <div className="col-10">
                                    <input className="form-control" type="text" value="Artisanal kale"
                                           id="example-text-input" />
                                </div>
                            </div>
                        </CardBody>
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