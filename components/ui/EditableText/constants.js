import PropTypes from 'prop-types';

export const BLOCK_LEVEL_FORMATS = ['format', 'list', 'align'];

export const VALID_LIST_ELEMENTS = ['ul', 'ol', 'li'];

export const VALID_BLOCK_ELEMENTS = [
  'div',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'pre',
  'monospace',
  'blockquote',
];

export const VALID_INLINE_FORMATS = [
  'span',
  'em',
  'strong',
  'b',
  'i',
  'sub',
  'sup',
  'br',
];

export const PROP_TYPES = {
  id: PropTypes.string.isRequired,
  prepId: PropTypes.string,
  isPrep: PropTypes.bool,
  isCompany: PropTypes.bool,
  /**
   * CWE field with shared content across multiple slides
   */
  isGlobal: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
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
};

export const DEFAULT_PROPS = {
  prepId: null,
  isPrep: false,
  isCompany: false,
  isGlobal: false,
  label: null,
  className: '',
  children: null,
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
};
