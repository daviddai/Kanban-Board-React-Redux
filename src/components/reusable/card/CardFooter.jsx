import React from "react";
import PropTypes from "prop-types";

export const CardFooter = (props) => {
    return (
        <div className={"card-footer " + props.className}>
            {props.children}
        </div>
    );
};

CardFooter.propTypes = {
    children: PropTypes.oneOfType(
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ).isRequired
};