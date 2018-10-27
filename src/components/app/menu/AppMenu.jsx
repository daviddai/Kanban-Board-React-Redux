import React, {Component} from "react";
import axios from "axios";
import PropTypes from "prop-types";

import TopNavBar from "../../reusable/bar/top-bar/TopNavBar";

class AppMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: []
        }
    }

    loadAppMenu = () => {
        axios.get("mockedUrl")
             .then(response => {

             })
             .catch(error => {
                 console.log("AppMenu Error: " + error.message);
                 this.setState(
                     {
                         "menuItems": this.props.menuItems
                     }
                 )
             });
    };

    componentDidMount() {
        this.loadAppMenu();
    }

    render() {
        return (
            <TopNavBar navItems={this.state.menuItems}/>
        );
    }

}

AppMenu.propTypes = {
    menuItems: PropTypes.array
};

export default AppMenu;