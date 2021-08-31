/*
* Exports a single column layout
*/
import React from 'react';
import PropTypes from 'prop-types';
import '../css/layout-single-column.css';

const LayoutSingleColumn = ({ children }) => (
  <div className="app-content-wrapper">
    <div className="content">
      {children}
    </div>
  </div>
);

export default LayoutSingleColumn;

LayoutSingleColumn.propTypes = {
  children: PropTypes.node.isRequired,
};
