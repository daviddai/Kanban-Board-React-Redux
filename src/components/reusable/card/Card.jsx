import React from "react";
import PropTypes from "prop-types";

export const Card = (props) => {
    return (
        <div className={"card " + props.className} style={props.style}>
            {props.children}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};