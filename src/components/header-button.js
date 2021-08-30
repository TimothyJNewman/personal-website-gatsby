import React from 'react';
import { Link } from "gatsby";
import '../css/header-button.css';

const ButtonHeader = ({ textValue, linkValue }) => {
  return (
    <Link to={linkValue}>
      <button className="button-header-wrapper">
        <div className="button-header">
          {textValue}
        </div>
      </button>
    </Link>
  );
}

export default ButtonHeader;
