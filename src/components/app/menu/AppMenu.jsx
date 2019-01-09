import React, {Component} from "react";
import axios from "axios";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import TopNavBar from "../../reusable/bar/top-bar/TopNavBar";
import TicketModal from "../kanban-board/ticket/TicketModal";

const mapStateToProps = state => {
    let ticketCreated;

    if (state.ticketCreated === undefined) {
        ticketCreated = false;
    } else {
        ticketCreated = state.ticketCreated;
    }

    return {
        ticketCreated: ticketCreated
    }
};

class ConnectedAppMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: [],
            currentSelectedMenuItemId: -1,
            showTicketModal: false
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

    handleMenuButtonClick = () => {
        this.setState({
           showTicketModal: true
        });
    };

    handleModalOnClose = () => {
        this.setState({
            showTicketModal: false
        });
    };

    render() {
        const showTicketModal = this.state.showTicketModal && !this.props.ticketCreated;

        return (
            <React.Fragment>
                <TopNavBar navItems={this.state.menuItems}
                           highlightNavItemId={this.state.currentSelectedMenuItemId}
                           handleNavItemClick={this.handleMenuItemClick}
                           handleButtonClick={this.handleMenuButtonClick}
                />
                <TicketModal showTicketModal={showTicketModal}
                             closeOnEsc={true}
                             handleModalOnClose={this.handleModalOnClose}
                />
            </React.Fragment>
        );
    }

}

ConnectedAppMenu.propTypes = {
    menuItems: PropTypes.array,
    ticketCreated: PropTypes.bool.isRequired
};

const AppMenu = connect(mapStateToProps)(ConnectedAppMenu);

export default AppMenu;