import React from "react";

export const CardBody = (props) => {
    return (
        <div className={"card-body " + props.className}>
            {props.children}
        </div>
    );
};