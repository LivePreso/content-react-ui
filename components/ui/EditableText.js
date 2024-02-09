import React from 'react';
import PropTypes from 'prop-types';
import { useSlide } from '@livepreso/content-react';
import style from './EditableText.module.scss';

const blockLevelFormats = ['format', 'list'];

export const EditableText = React.memo(props => {
  const {
    id,
    isPrep,
    isCompany,
    isGlobal,
    isReadOnly,
    tag,
    className,
    children,
    label,
    toolbar
  } = props;
  const { slideKey } = useSlide();
  const Tag = `${tag}`;
  const opts = {};

  if (isPrep && isGlobal) {
    throw new Error('EditableText - prep editable values cannot be global');
  }

  if (isPrep) {
    opts['data-editable'] = `${slideKey}-${id}`;
  }

  if (isReadOnly) {
    opts['data-readonly'] = true;
  }

  // TODO: Might need some attention for user templates (check with Hugh)
  if (isCompany) {
    opts['data-companywide-editable'] = isGlobal
      ? id
      : `${slideKey?.replace('template-', '')}-${id}`;
  }

  if (toolbar.length) {
    // Block-level formatting is restricted to 'div' tags
    const toolbarOptions =
      tag === 'div'
        ? toolbar
        : toolbar.filter(option => blockLevelFormats.indexOf(option) < 0);

    opts['data-toolbar'] = toolbarOptions.join(' ');
  }

  return (
    <>
      {label && <p className={style.label}>{label}</p>}
      <Tag data-testid={id} {...opts} className={className}>
        {children}
      </Tag>
    </>
  );
});

EditableText.propTypes = {
  id: PropTypes.string.isRequired,
  isPrep: PropTypes.bool,
  isCompany: PropTypes.bool,
  /**
   * CWE field with shared content across multiple slides
   */
  isGlobal: PropTypes.bool,
  isReadOnly: PropTypes.bool,
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
      'removeformat'
    ])
  ),
  label: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
};

EditableText.defaultProps = {
  isPrep: false,
  isCompany: false,
  isGlobal: false,
  isReadOnly: false,
  tag: 'div',
  toolbar: [
    'format',
    'list',
    'style',
    'color',
    'superscript',
    'align',
    'removeformat'
  ],
  label: null,
  children: null,
  className: ''
};
