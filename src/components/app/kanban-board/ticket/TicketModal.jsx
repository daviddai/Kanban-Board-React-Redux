import React, {Component} from "react";
import PropTypes from "prop-types";

import Modal from "react-responsive-modal";

import TicketForm from "../form/TicketForm";

export default class TicketModal extends Component {

    constructor(props) {
        super(props);
    }

    notifyInvoker = () => {
        if (this.props.handleModalOnClose != null) {
            this.props.handleModalOnClose();
        }
    };

    notifyTicketCreation = () => {

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
                   closeOnOverlayClick={false}
                   animationDuration={500}
            >
                <TicketForm ticketCreatedCallback={this.notifyTicketCreation}
                            ticketFormCancelledCallback={this.closeModal}
                />
            </Modal>
        );
    }

}

TicketModal.propTypes = {
    showTicketModal: PropTypes.bool.isRequired,
    handleModalOnClose: PropTypes.func
};