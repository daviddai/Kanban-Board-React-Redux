import React from "react";
import PropTypes from "prop-types";

import onClickOutside from "react-onclickoutside";

class EditInlineLabel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        };

        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside(event) {
        if (this.state.isActive) {
            this.toggleStatus();
        }
    }

    isClickedOn = () => {
        this.toggleStatus();
    };

    handleTextUpdate = (event) => {
        console.log(event.key);
        if (event.key === 'Enter') {
            this.toggleStatus();
        }
    };

    toggleStatus = () => {
        if (this.props.statusChangedCallback != null) {
            this.props.statusChangedCallback(!this.state.isActive);
        }

        this.setState({
            isActive: !this.state.isActive
        });
    };

    render() {
        let textStyle = Object.assign({}, this.props.textStyle);

        if (textStyle == null) {
            textStyle = {};
        }

        textStyle['display'] = this.state.isActive ? 'none' : 'inline';

        return (
            <React.Fragment>
                <input type="text"
                       defaultValue={this.props.text}
                       onKeyUp={this.handleTextUpdate}
                       style={{ display: this.state.isActive ? 'inline' : 'none' }}
                />
                <label onClick={this.isClickedOn}
                       style={textStyle}
                >
                    {this.props.text}
                </label>
            </React.Fragment>
        )
    }

}

let clickOutsideConfig = {
    handleClickOutside: function(instance) {
        return instance.handleClickOutside;
    }
};

EditInlineLabel.propTypes = {
    text: PropTypes.string.isRequired,
    textStyle: PropTypes.object,
    statusChangedCallback: PropTypes.func
};

export default onClickOutside(EditInlineLabel, clickOutsideConfig);