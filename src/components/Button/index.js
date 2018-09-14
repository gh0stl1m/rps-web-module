// External libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './Button.css';

const Button = (props) => {
  const { name, classes, type } = props;

  return (
    <div className={`container-button ${(classes) ? classes : ''}`}>
      <button type={type}>{name}</button>
      <div></div>
    </div>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Button;
