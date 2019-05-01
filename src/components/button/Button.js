import React from 'react';
import propTypes from 'prop-types';
import './Button.scss';

const Button = props => {
  const { children, primary, warning, ...propsToPass } = props;
  return (
    <button {...propsToPass} className={`Button ${primary ? 'Primary' : 'Secondary'} ${warning ? 'Warning' : ''}`}>
      {children}
    </button>
  );
};
Button.propTypes = {
  children: propTypes.node,
  primary: propTypes.bool,
  warning: propTypes.bool,
};

export default Button;
