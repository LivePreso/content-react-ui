import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { useModes, useSlide } from '@livepreso/content-react';

import style from './EditableImage.module.scss';

export const EditableImage = React.memo((props) => {
  const {
    id,
    prepId,
    isPrep,
    isCompany,
    isGlobal,
    isFullKey = false,
    isReadOnly,
    className,
    stopPropagation,
    maxSize,
    dimensions,
  } = props;
  const { slideKey } = useSlide();
  const { isPresomanager } = useModes();
  const opts = {};

  if (isPrep && isGlobal) {
    throw new Error('EditableImage - prep editable values cannot be global');
  }

  if (isPrep) {
    opts['data-dynamic-image'] = isFullKey
      ? prepId || id
      : `${slideKey}-${prepId || id}`;
  }

  // TODO: Might need some attention for user templates (check with Hugh)
  if (isCompany) {
    opts['data-companywide-dynamic-image'] =
      isGlobal || isFullKey
        ? id
        : `${slideKey?.replace('template-', '')}-${id}`;
  }

  if (isReadOnly) {
    opts['data-readonly'] = true;
  }
  if (maxSize) {
    opts['data-save-max-width'] = maxSize.width;
    opts['data-save-max-height'] = maxSize.height;
  }

  if (dimensions) {
    opts['data-image-dimensions'] = dimensions;
  }

  const testid = isPresomanager ? id : prepId || id;

  return (
    <div
      data-testid={testid}
      data-img
      {...opts}
      className={classNames(style.image, className)}
      onClick={stopPropagation ? (e) => e.stopPropagation() : () => {}}
    />
  );
});

EditableImage.propTypes = {
  id: PropTypes.string.isRequired,
  prepId: PropTypes.string,
  isPrep: PropTypes.bool,
  isCompany: PropTypes.bool,
  /**
   * CWE field with shared content across multiple slides
   */
  isGlobal: PropTypes.bool,
  /*  full CWE key has already been specified - do not prefix */
  isFullKey: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  className: PropTypes.string,
  dimensions: PropTypes.string,
  stopPropagation: PropTypes.bool,
  maxSize: PropTypes.exact({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

EditableImage.defaultProps = {
  prepId: null,
  isFullKey: null,
  isPrep: false,
  isCompany: false,
  isGlobal: false,
  isReadOnly: false,
  className: '',
  dimensions: '',
  stopPropagation: false,
  maxSize: null,
};
