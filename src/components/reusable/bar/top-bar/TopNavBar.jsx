import React, {Component} from "react";
import PropTypes from "prop-types";

class TopNavBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark mb-2">
                <a className="navbar-brand text-white" href="#">TopNavBar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {
                            this.props.navItems.map(navItemTitle => (
                                <a className="nav-item nav-link text-white"
                                   href="#">
                                    {navItemTitle}
                                </a>
                            ))
                        }
                    </div>
                </div>
            </nav>
        );
    }

}

TopNavBar.propTypes = {
    navItems: PropTypes.array
};

export default TopNavBar;