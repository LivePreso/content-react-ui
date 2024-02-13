import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { Column } from '../../layout';
import style from './Slide.module.scss';

export function Slide({ className, children }) {
  const classes = classnames(style.slide, className);

  return <Column className={classes}>{children}</Column>;
}

Slide.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Slide.defaultProps = {
  children: null,
  className: '',
};
