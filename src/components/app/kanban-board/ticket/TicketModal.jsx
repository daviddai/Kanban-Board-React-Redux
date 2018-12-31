import React, {Component} from "react";
import PropTypes from "prop-types";

import Modal from "react-responsive-modal";

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
            >
                <h2>Create Ticket</h2>
                <hr/>
                <p>Sample modal for creating new ticket</p>
            </Modal>
        );
    }

}

TicketModal.propTypes = {
    showTicketModal: PropTypes.bool.isRequired,
    handleModalOnClose: PropTypes.func
};