import React from "react";

export const Container = ({ lighter, children }) => (
  <div className = { 
    window.location.pathname === '/community' ||
    window.location.pathname === '/upload'    || 
    window.location.pathname === "/UserNexus" ||
    window.location.pathname === "/UserNexus/Posts" ||
    window.location.pathname === "/UserNexus/Games" ||
    window.location.pathname === "/UserNexus/EditProfile" 
    ? "container bg-standard halo"
    : "container"}>
    {children}
  </div>
);
