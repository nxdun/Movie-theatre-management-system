import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = props => {
  if (props.href) {
    return (
      <a
        className={`btn-custom btn-${props.size || 'default'} ${props.inverse &&
          'btn-inverse'} ${props.danger && 'btn-danger'}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`btn-custom btn-${props.size || 'default'} ${props.inverse &&
          'btn-inverse'} ${props.danger && 'btn-danger'}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`btn-custom btn-${props.size || 'default'} ${props.inverse &&
        'btn-inverse'} ${props.danger && 'btn-danger'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
