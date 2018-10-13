import React from "react";

export const Container = ({ lighter, children }) => (
  <div className={`container ${lighter?"bg-standard": ""}`}>
    {children}
  </div>
);
