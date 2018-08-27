import React from "react";

export const Card = (props) => {
    return (
        <div className={"card " + props.className} style={props.style}>
            {props.children}
        </div>
    );
};