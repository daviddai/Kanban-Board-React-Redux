import React from "react";
import PropTypes from "prop-types";

import ClickOutComponent from "react-onclickout";

export class EditInlineLabel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        };
    }

    handleClickOutside = (event) => {
        console.log("handleClickOutside");

        if (this.state.isActive) {
            this.toggleStatus();
        }
    };

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
        let element = "";

        console.log(this.state.isActive);

        if (this.state.isActive) {
            element = <input type="text"
                             defaultValue={this.props.text}
                      />;
        } else {
            element = <label onClick={this.isClickedOn}>{this.props.text}</label>;
        }

        return (
            <ClickOutComponent onClickOut={this.handleClickOutside}>{element}</ClickOutComponent>
        );
    }

}

EditInlineLabel.propTypes = {
    text: PropTypes.string.isRequired
};