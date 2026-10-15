import React from 'react';
import PropTypes from 'prop-types';
import { useModes } from '@livepreso/content-react';
import style from './EditableText.module.scss';
import { PROP_TYPES } from './constants';

// Renders what it is given. The marker attributes are resolved by the wrapper
// in index.js, which is where this component's editable source is declared.
export const EditableText = React.memo(
  ({
    id,
    prepId = null,
    attrs = {},
    isPrep = false,
    isGlobal = false,
    disableSmartPaste = false,
    stopPropagation = false,
    tag = 'div',
    className = '',
    children = null,
    label = null,
  }) => {
    const { isPresomanager } = useModes();
    const Tag = `${tag}`;

    const testid = isPresomanager ? id : prepId || id;

    if (isPrep && isGlobal) {
      throw new Error('EditableText - prep editable values cannot be global');
    }

    const opts = { ...attrs };

    if (disableSmartPaste) {
      opts['data-disable-smart-paste'] = true;
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
  },
);

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
