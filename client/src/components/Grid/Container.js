import React from "react";

export const Container = ({ lighter, children }) => (
  <div className = { 
    window.location.pathname === '/community' ||
    window.location.pathname === '/upload'    || 
    window.location.pathname === "/UserNexus" 
    // window.location.pathname === "/Signup"
    ? "container bg-standard"
    : "container"}>
    {children}
  </div>
);
