import React from 'react';
import PropTypes from 'prop-types';
import { useSlide, useModes } from '@livepreso/content-react';
import style from './EditableText.module.scss';

const blockLevelFormats = ['format', 'list', 'align'];

export const EditableText = React.memo((props) => {
  const {
    id,
    prepId,
    isPrep,
    isCompany,
    isGlobal,
    isReadOnly,
    disableSmartPaste,
    tag,
    className,
    children,
    label,
    toolbar,
    stopPropagation,
  } = props;
  const { slideKey } = useSlide();
  const { isPresomanager } = useModes();
  const Tag = `${tag}`;
  const opts = {};

  if (isPrep && isGlobal) {
    throw new Error('EditableText - prep editable values cannot be global');
  }

  if (isPrep) {
    opts['data-editable'] = `${slideKey}-${prepId || id}`;
  }

  // TODO: Might need some attention for user templates (check with Hugh)
  if (isCompany) {
    opts['data-companywide-editable'] = isGlobal
      ? id
      : `${slideKey?.replace('template-', '')}-${id}`;
  }

  if (isReadOnly) {
    opts['data-readonly'] = true;
  }

  if (disableSmartPaste) {
    opts['data-disable-smart-paste'] = true;
  }

  if (toolbar.length) {
    // Block-level formatting is restricted to 'div' tags
    const toolbarOptions =
      tag === 'div'
        ? toolbar
        : toolbar.filter((option) => blockLevelFormats.indexOf(option) < 0);

    opts['data-toolbar'] = toolbarOptions.join(' ');
  }

  const testid = isPresomanager ? id : prepId || id;

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
  isReadOnly: PropTypes.bool,
  disableSmartPaste: PropTypes.bool,
  tag: PropTypes.oneOf(['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
  toolbar: PropTypes.arrayOf(
    PropTypes.oneOf([
      'format',
      'list',
      'style',
      'color',
      'superscript',
      'align',
      'link',
      'removeformat',
    ]),
  ),
  label: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  stopPropagation: PropTypes.bool,
};

EditableText.defaultProps = {
  prepId: null,
  isPrep: false,
  isCompany: false,
  isGlobal: false,
  isReadOnly: false,
  disableSmartPaste: false,
  tag: 'div',
  toolbar: [
    'format',
    'list',
    'style',
    'color',
    'superscript',
    'align',
    'removeformat',
  ],
  label: null,
  children: null,
  className: '',
  stopPropagation: false,
};
