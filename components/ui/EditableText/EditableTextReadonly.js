import React from 'react';
import classNames from 'classnames';
import striptags from 'striptags';
import {
  useModes,
  useCWEEditableInfo,
  usePrepEditableInfo,
} from '@livepreso/content-react';
import { useSlideKeyPrefix } from '../../../hooks/use-slide-key-prefix';
import { getValidTags } from './utils';
import { DEFAULT_PROPS, PROP_TYPES } from './constants';
import style from './EditableText.module.scss';

export const EditableTextReadonly = React.memo((props) => {
  const {
    id,
    prepId,
    isPrep,
    isCompany,
    isGlobal,
    toolbar,
    tag,
    label,
    className,
    children,
  } = props;
  const { isPresomanager } = useModes();
  const cwePrefixedKey = useSlideKeyPrefix(id);
  const cweKey = isGlobal ? id : cwePrefixedKey;
  const prepKey = useSlideKeyPrefix(prepId || id);
  const { value: cweValue, hasValue: hasCWEValue } = useCWEEditableInfo(cweKey);
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

  const testid = isPresomanager ? cweKey : prepKey || cweKey;

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
});

EditableTextReadonly.propTypes = {
  ...PROP_TYPES,
};

EditableTextReadonly.defaultProps = {
  ...DEFAULT_PROPS,
};
