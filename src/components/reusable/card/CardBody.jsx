import React from "react";
import PropTypes from "prop-types";

export const CardBody = (props) => {
    return (
        <div className={"card-body " + props.className}>
            {props.children}
        </div>
    );
};

CardBody.propTypes = {
    children: PropTypes.oneOfType(
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ).isRequired
};