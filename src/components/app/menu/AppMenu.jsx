import React, {Component} from "react";
import axios from "axios";
import PropTypes from "prop-types";

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
                 this.setState(
                     {
                         "menuItems": response.data,
                         "currentSelectedMenuItemId": this.getMenuItemIdFromURI(response.data)
                     }
                 )
             })
             .catch(error => {
                 console.log("AppMenu Error: " + error.message);
                 this.setState(
                     {
                         "menuItems": this.props.menuItems,
                         "currentSelectedMenuItemId": this.getMenuItemIdFromURI(this.props.menuItems)
                     }
                 )
             });
    };

    getMenuItemIdFromURI = (menuItems) => {
        const uri = window.location.pathname;
        return menuItems.find(item => '/' + item.uri === uri).id;
    };

    componentDidMount() {
        this.loadAppMenu();
    }

    handleMenuItemClick = (menuItemId) => {
        this.setState({
            currentSelectedMenuItemId: menuItemId
        })
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