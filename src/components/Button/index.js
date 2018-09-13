// External libraries
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import './Button.css';

const Button = (props) => {
  const { name, linkTo, classes } = props;

  return (
    <div className={`container-button ${(classes) ? classes : ''}`}>
      <Link to={linkTo}>
        <button>{name}</button>
        <div></div>
      </Link>
    </div>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
}

export default Button;
