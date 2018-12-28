import React from "react";
import PropTypes from "prop-types";

export class EditInlineLabel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        };
    }

    isClickedOn = () => {
        this.toggleStatus();
    };

    handleTextUpdate = (event) => {
        this.toggleStatus();
    };

    toggleStatus = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    };

    render() {
        let html = "";

        if (this.state.isActive) {
            html = (
                <input type="text"
                       defaultValue={this.props.text}
                       onLostPointerCapture={this.handleTextUpdate}
                />
            );
        } else {
            html = (
                <label onClick={this.isClickedOn}>{this.props.text}</label>
            );
        }

        return html;
    }

}

EditInlineLabel.propTypes = {
    text: PropTypes.string.isRequired
};