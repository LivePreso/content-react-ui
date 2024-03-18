import React from 'react';
import { useArgs } from '@storybook/preview-api';
import { addRowAndCellUids } from './utils';
import {
  Table,
  Row,
  Cell,
  HeaderRow,
  SubheaderRow,
  HighlightRow,
  BodyRow,
  TitleCell,
} from '.';
import { AccordionRow } from './rows/AccordionRow';
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
    uid: 'header',
    type: ROW_TYPES.HEADER,
    cells: [
      { type: CELL_TYPES.TEXT, config: { value: 'Column 1' } },
      { type: CELL_TYPES.TEXT, config: { value: 'Column 2' } },
      { type: CELL_TYPES.TEXT, config: { value: 'Column 3' } },
    ],
  },
  {
    uid: 'subheader-1',
    type: ROW_TYPES.SUBHEADER,

    cells: [
      {
        colSpan: 3,
        type: CELL_TYPES.TEXT,
        config: { value: 'Subheader accordion' },
      },
    ],

    rows: [
      {
        uid: 'accordion-item-1',
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
    ],
  },
  {
    uid: 'subheader-2',
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
    uid: 'body-1',
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
    uid: 'header-2',
    type: ROW_TYPES.HEADER,

    cells: [
      {
        colSpan: 3,
        type: CELL_TYPES.TEXT,
        config: { value: 'Header accordion' },
      },
    ],

    rows: [
      {
        uid: 'accordion-subheader-1',
        type: ROW_TYPES.SUBHEADER,

        cells: [
          {
            colSpan: 3,
            type: CELL_TYPES.TEXT,
            config: { value: 'Nested accordion' },
          },
        ],

        rows: [
          {
            uid: 'nested-accordion-item-1',
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
        ],
      },
    ],
  },
  {
    uid: 'subheader-3',
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
    uid: 'body-2',
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
    uid: 'body-3',
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
    uid: 'body-4',
    type: ROW_TYPES.BODY,

    cells: [
      {
        type: CELL_TYPES.TEXT,
        rowSpanAdjacent: 'left',
        config: { value: 'no rowSpan' },
      },
      {
        type: CELL_TYPES.DEFAULT,
        config: { children: (<p>no rowSpan</p>) },
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

export const AccordionTable = {
  render: function Render({ children, rows, ...args }) {
    const [{ active }, updateArgs] = useArgs();

    return (
      <Table {...args}>
        <AccordionRow
          uid="accordion-test"
          active={active}
          rows={rows}
          onToggle={(val) => {
            updateArgs({ active: val });
          }}
        >
          {children}
        </AccordionRow>
      </Table>
    );
  },
  args: {
    uid: 'accordion',
    active: false,
    columnWidths: ['60%', '40%'],
    rows: [
      {
        renderItem: (item) => (
          <BodyRow uid="r2" {...item}>
            <Cell uid="r2-c1">
              <span>Product name</span>
            </Cell>
            <Cell uid="r2-c2">
              <span>Product value</span>
            </Cell>
          </BodyRow>
        ),
      },
      {
        renderItem: (item) => (
          <BodyRow uid="r3" {...item}>
            <Cell uid="r3-c1">
              <span>Product name</span>
            </Cell>
            <Cell uid="r3-c2">
              <span>Product value</span>
            </Cell>
          </BodyRow>
        ),
      },
    ],
    children: (
      <Cell uid="r1-c1" colSpan={2}>
        <span>Accordion Row</span>
      </Cell>
    ),
  },
};
