import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { useModes, useTargetKey } from '@livepreso/content-react';
import {
  defineEditableSource,
  prop,
  resolveEditable,
} from '@livepreso/webpack-deck';

import style from './EditableImage.module.scss';

export const EditableImage = React.memo((props) => {
  const {
    id,
    prepId = null,
    isPrep = false,
    isGlobal = false,
    isReadOnly = false,
    className = '',
    dimensions = '',
    stopPropagation = false,
    maxSize = null,
  } = props;

  const { isPresomanager } = useModes();
  const targetKey = useTargetKey();
  const { attrs } = resolveEditable(editable, props, { targetKey });

  if (isPrep && isGlobal) {
    throw new Error('EditableImage - prep editable values cannot be global');
  }

  const opts = { ...attrs };

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
  /**
   * "instance" (default) stores one image per placement of the slide, so each
   * placement of a template keeps its own. "deck" shares one image across every
   * slide and placement using the same key.
   */
  scope: PropTypes.oneOf(['instance', 'deck']),
  isReadOnly: PropTypes.bool,
  className: PropTypes.string,
  dimensions: PropTypes.string,
  stopPropagation: PropTypes.bool,
  maxSize: PropTypes.exact({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

// Both channels compose the same key. That moves prep keys on templates, which
// is safe where moving a companywide one would not be: a prep value belongs to
// one appointment, whose deck version is frozen.
//
// `{instance}` is what makes a value belong to one placement: the platform fills
// it per placement (`-autoadjunct-<n>` in PresoManager), and an HTML template's
// image fields are stored the same way. Without it every placement of a template
// shares one image. `isGlobal` stays deck-wide by design.
const editable = defineEditableSource(EditableImage, {
  type: 'image',
  everyone: {
    when: prop('isCompany'),
    key: '{targetKey}-{id}-{instance}',
    keyWhen: { isGlobal: '{id}', isFullKey: '{id}-{instance}' },
    scope: prop('scope', { default: 'instance' }),
  },
  personal: {
    when: prop('isPrep'),
    id: prop('prepId'),
    key: '{targetKey}-{id}-{instance}',
    keyWhen: { isFullKey: '{id}-{instance}' },
    scope: prop('scope', { default: 'instance' }),
  },
});
