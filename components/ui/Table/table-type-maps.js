import { ROW_TYPES, CELL_TYPES } from './table-constants';

import {
  ButtonsCell,
  DeltaCell,
  EditableTextCell,
  EmptyCell,
  ImageCell,
  ScoreCell,
  SubTitleCell,
  TextCell,
  ToggleCell,
  LegendCell,
  DefinitionListCell,
} from './cells';
import { Cell } from './Cell';

import { BodyRow, SubheaderRow, HighlightRow, HeaderRow } from './rows';

export const ROW_TYPES_MAP = {
  [ROW_TYPES.DEFAULT]: BodyRow,
  [ROW_TYPES.SUBHEADER]: SubheaderRow,
  [ROW_TYPES.HIGHLIGHT]: HighlightRow,
  [ROW_TYPES.HEADER]: HeaderRow,
  [ROW_TYPES.BODY]: BodyRow,
};

export const CELL_TYPES_MAP = {
  [CELL_TYPES.DEFAULT]: Cell,
  [CELL_TYPES.EMPTY]: EmptyCell,
  [CELL_TYPES.IMAGE]: ImageCell,
  [CELL_TYPES.DELTA]: DeltaCell,
  [CELL_TYPES.TEXT]: TextCell,
  [CELL_TYPES.SUBTITLE]: SubTitleCell,
  [CELL_TYPES.SCORE]: ScoreCell,
  [CELL_TYPES.TOGGLE]: ToggleCell,
  [CELL_TYPES.EDITABLE]: EditableTextCell,
  [CELL_TYPES.LEGEND]: LegendCell,
  [CELL_TYPES.BUTTONS]: ButtonsCell,
  [CELL_TYPES.DEFINITION_LIST]: DefinitionListCell,
};
