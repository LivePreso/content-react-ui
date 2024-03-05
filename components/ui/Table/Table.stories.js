import React from 'react';
import { addRowAndCellUids } from './utils';
import {
  Table,
  Row,
  Cell,
  HeaderRow,
  SubheaderRow,
  HighlightRow,
  TitleCell,
} from '.';
import { CELL_TYPES, ROW_TYPES } from './table-constants';

export default {
  component: Table,
  title: 'Components/UI/Table',
};

export const Default = {
  args: {
    label: 'Default',

    children: (
      <>
        <HeaderRow uid="row-1">
          <Cell uid="r1-c1" colSpan={2}>
            first cell spans 2
          </Cell>
          <Cell uid="r1-c2">
            <span>second</span>
          </Cell>
          <Cell uid="r1-c3">
            <span>third</span>
          </Cell>
          <Cell uid="r1-c4">
            <span>4th</span>
          </Cell>
        </HeaderRow>
        <Row uid="row-2">
          <TitleCell uid="r2-c1" title="first cell" />
          <Cell uid="r2-c2">
            <span>2nd</span>
          </Cell>
          <Cell uid="r2-c3">
            <span>3rd</span>
          </Cell>
          <Cell uid="r2-c4">
            <span>4th</span>
          </Cell>
          <Cell uid="r2-c5">
            <span>5th</span>
          </Cell>
        </Row>
      </>
    ),
  },
};

export const StickyColumn = {
  args: {
    label: 'Sticky first column',
    sticky: 'column',
    children: [
      <HeaderRow uid="row-1">
        <Cell uid="r1-c1">
          <span>first cell spans 2</span>
        </Cell>
        <Cell uid="r1-c2">
          <span>second</span>
        </Cell>
        <Cell uid="r1-c3">
          <span>third</span>
        </Cell>
        <Cell uid="r1-c4">
          <span>4th</span>
        </Cell>
        <Cell uid="r1-c5">
          <span>5th</span>
        </Cell>
      </HeaderRow>,
      <SubheaderRow uid="row-2">
        <TitleCell uid="r1-c1" title="subheader row" />
        <Cell uid="r1-c2">
          <span>2nd</span>
        </Cell>
        <Cell uid="r1-c3">
          <span>3rd</span>
        </Cell>
        <Cell uid="r1-c4">
          <span>4th</span>
        </Cell>
        <Cell uid="r1-c5">
          <span>5th</span>
        </Cell>
      </SubheaderRow>,
      <HighlightRow uid="row-3">
        <TitleCell uid="r1-c1" title="highlight row" />
        <Cell uid="r1-c2">
          <span>2nd</span>
        </Cell>
        <Cell uid="r1-c3">
          <span>3rd</span>
        </Cell>
        <Cell uid="r1-c4">
          <span>4th</span>
        </Cell>
        <Cell uid="r1-c5">
          <span>5th</span>
        </Cell>
      </HighlightRow>,
      <Row uid="row-4">
        <TitleCell uid="r1-c1" title="first cell" />
        <Cell uid="r1-c2">
          <span>2nd</span>
        </Cell>
        <Cell uid="r1-c3">
          <span>3rd</span>
        </Cell>
        <Cell uid="r1-c4">
          <span>4th</span>
        </Cell>
        <Cell uid="r1-c5">
          <span>5th</span>
        </Cell>
      </Row>,
    ],
  },
};

const sampleTableConfig = [
  {
    type: ROW_TYPES.HEADER,
    cells: [
      { type: CELL_TYPES.TEXT, config: { value: 'Column 1' } },
      { type: CELL_TYPES.TEXT, config: { value: 'Column 2' } },
      { type: CELL_TYPES.TEXT, config: { value: 'Column 3' } },
    ],
  },
  {
    type: ROW_TYPES.SUBHEADER,

    cells: [
      {
        colSpan: 3,
        type: CELL_TYPES.TEXT,
        config: { value: 'Cell alignment' },
      },
    ],
  },
  {
    type: ROW_TYPES.BODY,

    cells: [
      { type: CELL_TYPES.TEXT, config: { value: 'text left' } },
      {
        type: CELL_TYPES.TEXT,
        align: 'center',
        config: { value: 'text center' },
      },
      {
        type: CELL_TYPES.TEXT,
        align: 'right',
        config: { value: 'text right' },
      },
    ],
  },
  {
    type: ROW_TYPES.SUBHEADER,

    cells: [
      {
        colSpan: 3,
        type: CELL_TYPES.TEXT,
        config: { value: 'Column spans' },
      },
    ],
  },
  {
    type: ROW_TYPES.BODY,

    cells: [
      {
        type: CELL_TYPES.TEXT,
        colSpan: 2,
        config: { value: 'colSpan 2' },
      },
      {
        type: CELL_TYPES.TEXT,
        config: { value: 'no colSpan' },
      },
    ],
  },
  {
    type: ROW_TYPES.SUBHEADER,

    cells: [
      {
        colSpan: 3,
        type: CELL_TYPES.TEXT,
        config: { value: 'Row spans' },
      },
    ],
  },
  {
    type: ROW_TYPES.BODY,

    cells: [
      {
        type: CELL_TYPES.TEXT,
        rowSpan: 3,
        config: { value: 'rowSpan=3' },
      },
      {
        type: CELL_TYPES.TEXT,
        config: { value: 'no rowSpan' },
      },
      {
        type: CELL_TYPES.TEXT,
        rowSpan: 2,
        config: { value: 'rowSpan=2' },
      },
    ],
  },
  {
    type: ROW_TYPES.BODY,

    cells: [
      {
        type: CELL_TYPES.TEXT,
        rowSpanAdjacent: 'left',
        config: { value: 'no rowSpan' },
      },
    ],
  },
  {
    type: ROW_TYPES.BODY,

    cells: [
      {
        type: CELL_TYPES.TEXT,
        rowSpanAdjacent: 'left',
        config: { value: 'no rowSpan' },
      },
      {
        type: CELL_TYPES.TEXT,
        config: { value: 'no rowSpan' },
      },
    ],
  },
];

const sampleColumnWidths = ['50%', '25%', '25%'];

export const Schema = {
  args: {
    label: 'Default',
    rows: addRowAndCellUids(sampleTableConfig),
    columnWidths: sampleColumnWidths,
  },
};
