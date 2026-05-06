import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { useSlide, useTransitions } from '@livepreso/content-react';
import { Column } from '../layout';
import style from './Content.module.scss';

export function Content({
  className = '',
  introAnimation = 'none',
  children = null,
}) {
  const { isSlideReady } = useSlide();
  const { entered } = useTransitions();
  const classes = classNames(className, style.content, {
    [style.fadeIn]: introAnimation === 'fade-in',
    [style.entered]: isSlideReady && entered,
  });

  return (
    <Column flex={1} className={classes}>
      {children}
    </Column>
  );
}

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  introAnimation: PropTypes.oneOf(['none', 'fade-in']),
};
