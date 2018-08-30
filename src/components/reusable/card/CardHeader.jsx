import React from "react";
import PropTypes from "prop-types";

export const CardHeader = (props) => {
    return (
        <div className={"card-header " + props.className}>
            {props.children}
        </div>
    );
};

CardHeader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};