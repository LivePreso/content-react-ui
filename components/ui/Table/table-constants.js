// import PropTypes from 'prop-types';
import {
  ButtonsCell,
  DeltaCell,
  EditableTextCell,
  ImageCell,
  ScoreCell,
  SubTitleCell,
  TextCell,
  ToggleCell,
  LegendCell,
} from './cells';

import { BodyRow, SubheaderRow, HighlightRow, HeaderRow } from './rows';

export const ROW_TYPES = {
  DEFAULT: 'Default',
  SUBHEADER: 'SubheaderRow',
  HIGHLIGHT: 'HighlightRow',
  HEADER: 'HeaderRow',
  BODY: 'BodyRow',
};

export const ROW_TYPES_MAP = {
  [ROW_TYPES.DEFAULT]: BodyRow,
  [ROW_TYPES.SUBHEADER]: SubheaderRow,
  [ROW_TYPES.HIGHLIGHT]: HighlightRow,
  [ROW_TYPES.HEADER]: HeaderRow,
  [ROW_TYPES.BODY]: BodyRow,
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
  LEGEND: 'LegendCell',
  BUTTONS: 'ButtonsCell',
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
  [CELL_TYPES.LEGEND]: LegendCell,
  [CELL_TYPES.BUTTONS]: ButtonsCell,
};
