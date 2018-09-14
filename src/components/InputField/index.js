// External libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './InputField.css';

const InputField = (props) => {
  const { type, required, name, handleChange, value } = props;

  return (
    <label className="label-container">
      <input
        className="label-input"
        type={type}
        required={required}
        onChange={handleChange}
        value={value}
        name={name}
      />
      <div className="label-text">{name}</div>
    </label>
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default InputField;
