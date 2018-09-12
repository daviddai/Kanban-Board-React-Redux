import React, {Component} from "react";
import { DropTarget } from 'react-dnd';

const shoppingCartSpec = {
    drop() {
        return {
            name: 'ShoppingCart'
        }
    }
};

let collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
};

class ShoppingCart extends Component {

    render() {
        return (
            <div>
                Drag here to order!
            </div>
        );
    }

}



