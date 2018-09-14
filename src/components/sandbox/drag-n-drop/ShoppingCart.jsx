import React, {Component} from "react";
import PropTypes from "prop-types";
import {DropTarget} from 'react-dnd';


/*
    ShoppingCartSpec is a plain object implementing the drop target specification

    DropTarget Methods (All Optional)
    - drop:    called when a compatible item is dropped
    - hover:   called when an item is hovered over the component
    - canDrop: use it to specify whether the drop target is able to accept the item
 */
const ShoppingCartSpec = {
    drop() {
        return {
            name: 'ShoppingCart'
        }
    }
};

/*
    ShoppingCart DropTarget - collect
    - connect: an instance of DropTargetConnector to be used to assign the drop target
               role to a DOM node
    - monitor: an instance of DropTargetMonitor which is used to connect state from the
               React DnD to props
 */
let collect = (connect, monitor) => {
    // map the react dnd state into component's props
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
};

class ShoppingCart extends Component {

    render() {
        const {
            canDrop,
            isOver,
            connectDropTarget
        } = this.props;

        const isActive = canDrop && isOver;

        let backgroundColour = '#FFFFFF';

        if (isActive) {
            backgroundColour = '#F7F7BD';
        } else if (canDrop) {
            backgroundColour = '#F7F7F7';
        }

        const style = {
            backgroundColour: backgroundColour
        };

        return connectDropTarget(
            <div className="shopping-cart" style={style}>
                {
                    isActive ? 'Hmmmm, snack!' : 'Drag here to order!'
                }
            </div>
        );
    }

}

ShoppingCart.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
};

export default DropTarget('snack', ShoppingCartSpec, collect)(ShoppingCart);



