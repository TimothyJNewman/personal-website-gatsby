/*
* Exports a single column layout
*/
import React from "react";
import "../css/layout-single-column.css"

const LayoutSingleColumn = ({ children }) => {
  return (
      <div className="app-content-wrapper">
        <div className="content">
          {children}
        </div>
      </div>
  )
}

export default LayoutSingleColumn
