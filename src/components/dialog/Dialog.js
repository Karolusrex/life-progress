import React from 'react';
import propTypes from 'prop-types';
import './Dialog.scss';

const Dialog = props => (
  <div className="DialogBackground">
    <div className="Dialog">{props.children}</div>
  </div>
);

Dialog.propTypes = {
  children: propTypes.node,
};

export default Dialog;
