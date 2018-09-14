// External libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './Option.css';

const Option = ({ image, styleClass, onClick }) => {
  return (
    <div className={`element-container ${(styleClass !== '') ? styleClass : ''}`}>
      <i className={`far fa-hand-${image}`} onClick={onClick}></i>
      <div className="element-background"></div>
    </div>
  );
};

Option.propTypes = {
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Option;
