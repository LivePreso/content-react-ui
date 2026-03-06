import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Column } from '../../layout';
import style from './Slide.module.scss';

export function Slide({ className = '', children = null }) {
  const classes = classNames(style.slide, className);

  return (
    <Column flex={1} className={classes}>
      {children}
    </Column>
  );
}

Slide.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
