import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

class TopNavBar extends Component {

    handleNavItemClick = (event) => {
        this.props.handleNavItemClick(event.target.getAttribute('id'));
    };

    openTicketModal = (event) => {
        this.props.handleButtonClick();
    };

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
                            this.props.navItems.map(navItem => {
                                if (navItem.type === 'link') {
                                    return (
                                        <Link key={navItem.id}
                                              id={navItem.id}
                                              className={"nav-item nav-link text-white" + (this.props.highlightNavItemId == navItem.id ? " font-weight-bold" : "")}
                                              to={navItem.uri}
                                              onClick={this.handleNavItemClick}
                                        >
                                            {navItem.title}
                                        </Link>
                                    );
                                } else {
                                    return (
                                        <button key={navItem.id}
                                                id={navItem.id}
                                                className="btn btn-primary mx-2 font-weight-bold"
                                                onClick={this.openTicketModal}
                                        >
                                            {navItem.name}
                                        </button>
                                    );
                                }
                            })
                        }
                    </div>
                </div>
            </nav>
        );
    }

}

TopNavBar.propTypes = {
    navItems: PropTypes.array,
    highlightNavItemId: PropTypes.number,
    handleNavItemClick: PropTypes.func,
    handleButtonClick: PropTypes.func
};

export default TopNavBar;