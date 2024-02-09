import React from 'react';
import PropTypes from 'prop-types';
import style from './Errors.module.scss';

export function Errors(props) {
  const { errors } = props;

  return (
    <div className={style.errors}>
      {errors.map(error => (
        <h5>{error}</h5>
      ))}
    </div>
  );
}

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired
};
