import React from "react";

export const CardFooter = (props) => {
    return (
        <div className={"card-footer " + props.className}>
            {props.children}
        </div>
    );
};