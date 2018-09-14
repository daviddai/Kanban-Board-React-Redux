import React, {Component} from "react";
import PropTypes from "prop-types";
import {DragSource} from "react-dnd";

/**
 * Snack Drag Spec
 * beginDrag(Required)
 * endDrag(Optional)
 * canDrag(Optional)
 * isDragging(Optional)
 */
const snackSpec = {

    beginDrag(props) {
        return {
            name: props.name
        }
    },

    endDrag(props, monitor) {
        const dragItem = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            console.log(`You dropped ${dragItem.name} into ${dropResult.name}`);
        }
    }

};

/**
 * Snack DragSource collect collecting function
 * @param connect an instance of DragSourceConnector which is used to assign the drag source role to a DOM node
 * @param monitor an instance of DragSourceMonitor to connect state from React dnd to component's props
 */
let collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
};

class Snack extends Component {

    render() {
        const {
            name,
            isDragging,
            connectDragSource
        } = this.props;

        const opacity = isDragging ? 0.4 : 1;

        const style = {
            opacity: opacity
        };

        return connectDragSource(
            <div className="snack" style={style}>
                {name}
            </div>
        );
    }

}

Snack.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
};

export default DragSource('snack', snackSpec, collect)(Snack);