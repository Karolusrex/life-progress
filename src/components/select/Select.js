import React from 'react';
import propTypes from 'prop-types';
import './Select.scss';

const Select = props => {
  const { onChange, items = [] } = props;

  const selectedIndex = props.value && items.findIndex(({ value }) => value === props.value);

  const onChangeListener = event => {
    if (!onChange) {
      return;
    }
    const index = +event.target.value;
    onChange(items[index].value);
  };

  return (
    <div className="Select">
      <label>
        {props.label}
        <div className="SelectWrapper">
          <select onChange={onChangeListener} value={selectedIndex}>
            {items.map(({ label }, index) => (
              <option key={index} value={index}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </label>
    </div>
  );
};

Select.propTypes = {
  onChange: propTypes.func,
  items: propTypes.array,
  label: propTypes.string,
  value: propTypes.any,
};
export default Select;
