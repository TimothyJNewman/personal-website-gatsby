/*
 * Exports a single column layout
 */
import React from 'react';
import PropTypes from 'prop-types';

const LayoutSingleColumn = ({ children }) => (
  <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col items-center p-2">
    {children}
  </div>
);

export default LayoutSingleColumn;

LayoutSingleColumn.propTypes = {
  children: PropTypes.node.isRequired,
};
