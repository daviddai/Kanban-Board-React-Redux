import React, {Component} from "react";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Container extends  Component {

    render() {
        return (
            <div>

            </div>
        )
    }

}

export default DragDropContext(HTML5Backend)(Container);
