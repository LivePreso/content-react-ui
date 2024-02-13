import PropTypes from 'prop-types';
import React from 'react';
import { EditableText } from '@ui/components/ui';
import style from './Footer.module.scss';

export function Footer({ isPrep, isCompany, children }) {
  return (
    <EditableText
      className={style.footer}
      id="footer"
      isPrep={isPrep}
      isCompany={isCompany}
    >
      <h6>{children}</h6>
    </EditableText>
  );
}

Footer.propTypes = {
  isPrep: PropTypes.bool,
  isCompany: PropTypes.bool,
  children: PropTypes.node,
};

Footer.defaultProps = {
  isPrep: false,
  isCompany: true,
  children: '',
};
