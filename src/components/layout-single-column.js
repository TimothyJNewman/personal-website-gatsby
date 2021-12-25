/*
* Exports a single column layout
*/
import React from 'react';
import PropTypes from 'prop-types';

const LayoutSingleColumn = ({ children }) => (
  <div className="bg-white text-primary flex justify-center">
    <div className="max-w-screen-lg min-h-screen mx-auto flex flex-col items-center p-2">
      {children}
    </div>
  </div>
);

export default LayoutSingleColumn;

LayoutSingleColumn.propTypes = {
  children: PropTypes.node.isRequired,
};
