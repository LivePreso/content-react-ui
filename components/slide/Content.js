import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Column } from '../layout';
import style from './Content.module.scss';

export function Content({ className = '', children = null }) {
  const classes = classNames(className, style.content);

  return (
    <Column flex={1} className={classes}>
      {children}
    </Column>
  );
}

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
