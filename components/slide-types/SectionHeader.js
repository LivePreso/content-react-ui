import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Column } from '@ui/components/layout';
import { Header, Slide } from '@ui/components/slide';
import style from './SectionHeader.module.scss';

export function SectionHeader({ className, title, children }) {
  const classes = classnames(style.sectionHeader, className);

  return (
    <Slide className={classes}>
      <Column flex={1} justify="center">
        <Header key="slide-header" className={style.title}>
          {title}
        </Header>
        {children && <div key="slide-content">{children}</div>}
      </Column>
    </Slide>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

SectionHeader.defaultProps = {
  title: null,
  className: '',
  children: null,
};
