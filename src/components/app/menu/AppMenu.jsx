import React, {Component} from "react";
import axios from "axios";
import PropTypes from "prop-types";

import update from 'react-addons-update';
import TopNavBar from "../../reusable/bar/top-bar/TopNavBar";

class AppMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: [],
            currentSelectedMenuItemId: -1
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

    handleMenuItemClick = (menuItemId) => {
        // todo: update state with new selected menu item id
    };

    render() {
        return (
            <TopNavBar navItems={this.state.menuItems}
                       highlightNavItemId={this.state.currentSelectedMenuItemId}
                       handleNavItemClick={this.handleMenuItemClick}
            />
        );
    }

}

AppMenu.propTypes = {
    menuItems: PropTypes.array
};

export default AppMenu;