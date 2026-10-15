import React from 'react';
import classNames from 'classnames';
import striptags from 'striptags';
import {
  useModes,
  useCWEEditableInfo,
  usePrepEditableInfo,
} from '@livepreso/content-react';
import { getValidTags } from './utils';
import { PROP_TYPES } from './constants';
import style from './EditableText.module.scss';

export const EditableTextReadonly = React.memo(
  ({
    id,
    prepId = null,
    keys = {},
    isPrep = false,
    isCompany = false,
    label = null,
    className = '',
    children = null,
    tag = 'div',
    toolbar = [
      'format',
      'list',
      'style',
      'color',
      'superscript',
      'align',
      'removeformat',
    ],
  }) => {
    const { isPresomanager } = useModes();
    // Resolved by the wrapper in index.js, which is where the source is
    // declared. A channel that is switched off has no key here, which is
    // harmless: its value is only read when its own flag is set.
    const { everyone: cweKey, personal: prepKey } = keys;
    const { value: cweValue, hasValue: hasCWEValue } =
      useCWEEditableInfo(cweKey);
    const { value: prepValue, hasValue: hasPrepValue } =
      usePrepEditableInfo(prepKey);

    let hasValue = false;
    let value;

    // Prep overrides company if present
    if (isCompany && hasCWEValue) {
      hasValue = true;
      value = cweValue;
    }

    if (isPrep && hasPrepValue) {
      hasValue = true;
      value = prepValue;
    }

    const classes = classNames(className, 'editable-text-tiny-mce');
    const Tag = `${tag}`;

    const testid =
      (isPresomanager ? cweKey : prepKey || cweKey) ?? (prepId || id);

    if (!hasValue) {
      return (
        <>
          {label && <p className={style.label}>{label}</p>}
          <Tag data-testid={testid} data-readonly className={classes}>
            {children}
          </Tag>
        </>
      );
    }

    return (
      <>
        {label && <p className={style.label}>{label}</p>}
        <Tag
          data-testid={testid}
          data-readonly
          className={classes}
          dangerouslySetInnerHTML={{
            __html: striptags(value, getValidTags(toolbar)),
          }}
        />
      </>
    );
  },
);

EditableTextReadonly.propTypes = {
  ...PROP_TYPES,
};
