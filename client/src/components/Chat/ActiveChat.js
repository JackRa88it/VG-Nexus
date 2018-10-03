import React from "react";

export const ActiveChat = props => (
  <button {...props} className="btn btn-success">
    {props.children}
  </button>
);
