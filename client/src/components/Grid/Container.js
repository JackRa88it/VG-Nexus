import React from "react";

export const Container = ({ lighter, children }) => (
  <div className= {window.location.pathname === '/community'
    ? "container bg-standard"
    : "container"}>
    {children}
  </div>
);
