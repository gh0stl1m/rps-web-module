// External libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './InputField.css';

const InputField = (props) => {
  const { type, required, name } = props;

  return (
    <label className="label-container">
      <input className="label-input" type={type} required={required} />
      <div class="label-text">{name}</div>
    </label>
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
}

export default InputField;
