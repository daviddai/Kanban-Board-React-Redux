import React from "react";

export const CardHeader = (props) => {
    return (
        <div className={"card-header " + props.className}>
            {props.children}
        </div>
    );
};