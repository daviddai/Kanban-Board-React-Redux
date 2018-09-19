import React, {Component} from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import "./animation.css";

class ToggleableContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isToggled: false
        }
    }

    toggle = () => {
        this.setState({
            isToggled: !this.state.isToggled
        });
    };

    render() {
        let toggleableContainer;

        if (!this.state.isToggled) {
            toggleableContainer = (
                <div className="toggleable-container">
                    This is Toggleable Container
                </div>
            );
        }

        return (
            <div className="outer-container container text-center">
                <div className="controller-container" onClick={this.toggle}>
                    Below is Toggleable Container
                    <hr/>
                </div>
                <ReactCSSTransitionGroup transitionName="toggle"
                                         transitionEnterTimeout={250}
                                         transitionLeaveTimeout={250}>
                    {toggleableContainer}
                </ReactCSSTransitionGroup>
            </div>
        )
    }

}

export default ToggleableContainer;