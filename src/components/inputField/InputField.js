import React from 'react';
import propTypes from 'prop-types';
import './InputField.css';

const InputField = props => {
  const { label, ...propsToPass } = props;
  const onChangeFormatted = event => {
    const { onChange } = props;
    if (!onChange) {
      return;
    }
    const {
      target: { value },
    } = event;
    onChange(value);
  };
  return (
    <div className="InputField">
      <label>
        {label}
        <input lang="en" {...propsToPass} onChange={onChangeFormatted} />
      </label>
    </div>
  );
};

InputField.propTypes = {
  label: propTypes.string,
  onChange: propTypes.function,
};
export default InputField;
