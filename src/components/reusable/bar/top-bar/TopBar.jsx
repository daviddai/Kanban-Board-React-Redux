import React, {Component} from "react";
import PropTypes from "prop-types";

class TopBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark mb-2">
                <a className="navbar-brand text-white" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active text-white" href="#">Home <span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link text-white" href="#">Features</a>
                        <a className="nav-item nav-link text-white" href="#">Pricing</a>
                        <a className="nav-item nav-link text-white" href="#">Disabled</a>
                    </div>
                </div>
            </nav>
        );
    }

}

export default TopBar;