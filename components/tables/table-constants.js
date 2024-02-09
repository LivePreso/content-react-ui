import PropTypes from 'prop-types';
import {
  ButtonsCell,
  DeltaCell,
  EditableTextCell,
  ImageCell,
  ScoreCell,
  SubTitleCell,
  TextCell,
  ToggleCell
} from './cells';

export const ROW_TYPES = {
  DEFAULT: 'Default',
  SUBHEADER: 'SubheaderRow',
  HIGHLIGHT: 'HighlightRow',
  HEADER: 'HeaderRow',
  BODY: 'BodyRow'
};

export const CELL_TYPES = {
  DEFAULT: 'Default',
  IMAGE: 'ImageCell',
  DELTA: 'DeltaCell',
  TEXT: 'TextCell',
  SUBTITLE: 'SubTitleCell',
  SCORE: 'ScoreCell',
  TOGGLE: 'ToggleCell',
  EDITABLE: 'EditableTextCell',
  BUTTONS: 'ButtonsCell'
};

export const CELL_TYPES_MAP = {
  [CELL_TYPES.DEFAULT]: TextCell,
  [CELL_TYPES.IMAGE]: ImageCell,
  [CELL_TYPES.DELTA]: DeltaCell,
  [CELL_TYPES.TEXT]: TextCell,
  [CELL_TYPES.SUBTITLE]: SubTitleCell,
  [CELL_TYPES.SCORE]: ScoreCell,
  [CELL_TYPES.TOGGLE]: ToggleCell,
  [CELL_TYPES.EDITABLE]: EditableTextCell,
  [CELL_TYPES.BUTTONS]: ButtonsCell
};

export const columnPropTypes = PropTypes.arrayOf(
  PropTypes.exact({
    uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    type: PropTypes.oneOf(Object.values(CELL_TYPES)),
    // Different types above will have different config types. We'll use the
    // component attached to each type to further check the config props.
    config: PropTypes.object
  })
);
