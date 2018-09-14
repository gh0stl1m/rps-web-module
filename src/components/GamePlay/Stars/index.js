// External libraries
import React from 'react';
import PropTypes from 'prop-types';

import './Stars.css';

const Stars = ({ username }) => {
  return (
    <div className="container-stars">
      <h1>{username}</h1>
      <div>
        <i className="far fa-star"></i>
        <i className="far fa-star"></i>
        <i className="far fa-star"></i>
      </div>
    </div>
  );
};

Stars.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Stars;
