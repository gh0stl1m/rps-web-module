// External libraries
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import './ButtonLink.css';

const ButtonLink = (props) => {
  const { name, linkTo, classes } = props;

  return (
    <div className={`container-button-link ${(classes) ? classes : ''}`}>
      <Link to={linkTo}>
        <button>{name}</button>
        <div></div>
      </Link>
    </div>
  );
}

ButtonLink.propTypes = {
  name: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
}

export default ButtonLink;
