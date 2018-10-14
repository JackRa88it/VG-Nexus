import React from "react";

export const Col = ({ size,off, children }) => (
  <div 
    className = {
       size.split(" ").map(size => 
       "col-" + size + ( off?(" offset-md-1"):"") ).join(" ")
    }>
    {children}
  </div>
);
