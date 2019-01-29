import React, {Component} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import TopNavBar from "../../reusable/bar/top-bar/TopNavBar";
import TicketModal from "../kanban-board/ticket/TicketModal";
import {loadAppMenuItems} from "../../../actions/app-menu/AppMenuAction";

const mapStateToProps = state => {
    let ticketCreated;

    if (state.ticketCreated === undefined) {
        ticketCreated = false;
    } else {
        ticketCreated = state.kanbanBoardReducer.ticketCreated;
    }

    return {
        menuItems: state.appMenuReducer.menuItems,
        ticketCreated: ticketCreated
    }
};

class ConnectedAppMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showTicketModal: false
        }
    }

    componentDidMount() {
        this.props.loadAppMenuItems(this.highlightMenuItem);
    }

    handleMenuItemClick = (menuItemId) => {
        this.highlightMenuItem(menuItemId);
    };

    highlightMenuItem = (menuItemId) => {
        this.setState({
            currentSelectedMenuItemId: parseInt(menuItemId)
        });
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
                <TopNavBar navItems={this.props.menuItems}
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

const AppMenu = connect(mapStateToProps,
                       {
                           loadAppMenuItems
                       })(ConnectedAppMenu);

export default AppMenu;