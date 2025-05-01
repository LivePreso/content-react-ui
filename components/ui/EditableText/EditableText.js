import React from 'react';
import PropTypes from 'prop-types';
import { useModes } from '@livepreso/content-react';
import { useSlideKeyPrefix } from '../../../hooks/use-slide-key-prefix';
import style from './EditableText.module.scss';
import { DEFAULT_PROPS, PROP_TYPES } from './constants';

export const EditableText = React.memo((props) => {
  const {
    id,
    prepId,
    isPrep,
    isCompany,
    isGlobal,
    disableSmartPaste,
    tag,
    className,
    children,
    label,
    toolbar,
    stopPropagation,
  } = props;
  const { isPresomanager } = useModes();
  const cwePrefixedKey = useSlideKeyPrefix(id);
  const cweKey = isGlobal ? id : cwePrefixedKey;
  const prepKey = useSlideKeyPrefix(prepId || id);
  const Tag = `${tag}`;

  const testid = isPresomanager ? id : prepId || id;

  if (isPrep && isGlobal) {
    throw new Error('EditableText - prep editable values cannot be global');
  }

  const opts = {};

  if (isPrep) {
    opts['data-editable'] = prepKey;
  }

  if (isCompany) {
    opts['data-companywide-editable'] = cweKey;
  }

  if (disableSmartPaste) {
    opts['data-disable-smart-paste'] = true;
  }

  if (toolbar.length) {
    opts['data-toolbar'] = toolbar.join(' ');
  }

  return (
    <>
      {label && <p className={style.label}>{label}</p>}
      <Tag
        data-testid={testid}
        {...opts}
        className={className}
        onClick={stopPropagation ? (e) => e.stopPropagation() : () => {}}
      >
        {children}
      </Tag>
    </>
  );
});

EditableText.propTypes = {
  id: PropTypes.string.isRequired,
  prepId: PropTypes.string,
  isPrep: PropTypes.bool,
  isCompany: PropTypes.bool,
  /**
   * CWE field with shared content across multiple slides
   */
  isGlobal: PropTypes.bool,
  disableSmartPaste: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  ...PROP_TYPES,
};

EditableText.defaultProps = {
  prepId: null,
  isPrep: false,
  isCompany: false,
  isGlobal: false,
  disableSmartPaste: false,
  stopPropagation: false,
  ...DEFAULT_PROPS,
};
