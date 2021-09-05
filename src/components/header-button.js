import React from 'react';
import { Link } from 'gatsby';

const ButtonHeader = ({ textValue, linkValue }) => (
  <Link to={linkValue}>
    <button className="button-header-wrapper" type="button">
      <div className="button-header">
        {textValue}
      </div>
    </button>
  </Link>
);

export default ButtonHeader;
