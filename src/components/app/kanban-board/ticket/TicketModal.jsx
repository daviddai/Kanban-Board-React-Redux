import React, {Component} from "react";

import Modal from "react-responsive-modal";

export default class TicketModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpened: false
        };
    }

    openModal = () => {
        this.setState({
            isOpened: true
        });
    };

    closeModal = () => {
        this.setState({
            isOpened: false
        });
    };

    render() {
        const isOpened = this.state.isOpened;

        return (
            <Modal open={isOpened}
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

};