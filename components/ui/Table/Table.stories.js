import React from 'react';
import { addRowAndCellUids, addUids } from '@ui/utils/add-uids';
import { Table, Row, Cell } from '.';
// import { propertyAnalysisToTableConfig } from '../../js/data-processing/property-analysis';
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
        <Row type="header">
          <Cell colSpan={2}>first cell spans 2</Cell>
          <Cell>
            <span>second</span>
          </Cell>
          <Cell>
            <span>third</span>
          </Cell>
          <Cell>
            <span>4th</span>
          </Cell>
        </Row>
        <Row>
          <Cell type="header">
            <span>first cell</span>
          </Cell>
          <Cell>
            <span>2nd</span>
          </Cell>
          <Cell>
            <span>3rd</span>
          </Cell>
          <Cell>
            <span>4th</span>
          </Cell>
          <Cell>
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
      <Row type="header">
        <Cell>
          <span>first cell spans 2</span>
        </Cell>
        <Cell>
          <span>second</span>
        </Cell>
        <Cell>
          <span>third</span>
        </Cell>
        <Cell>
          <span>4th</span>
        </Cell>
        <Cell>
          <span>5th</span>
        </Cell>
      </Row>,
      <Row>
        <Cell type="header">first cell</Cell>
        <Cell>
          <span>2nd</span>
        </Cell>
        <Cell>
          <span>3rd</span>
        </Cell>
        <Cell>
          <span>4th</span>
        </Cell>
        <Cell>
          <span>5th</span>
        </Cell>
      </Row>,
      <Row>
        <Cell type="header">first cell</Cell>
        <Cell>
          <span>2nd</span>
        </Cell>
        <Cell>
          <span>3rd</span>
        </Cell>
        <Cell>
          <span>4th</span>
        </Cell>
        <Cell>
          <span>5th</span>
        </Cell>
      </Row>,
      <Row>
        <Cell type="header">first cell</Cell>
        <Cell>
          <span>2nd</span>
        </Cell>
        <Cell>
          <span>3rd</span>
        </Cell>
        <Cell>
          <span>4th</span>
        </Cell>
        <Cell>
          <span>5th</span>
        </Cell>
      </Row>,
    ],
  },
};

const sampleTableConfig = [
  { type: ROW_TYPES.HEADER },
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

const sampleColumnLayout = [
  { title: 'column one', width: '33%' },
  { title: 'column two', width: '33%' },
  { title: 'column three', width: '33%' },
];

export const Schema = {
  args: {
    label: 'Default',
    rows: addRowAndCellUids(sampleTableConfig),
    columns: addUids(sampleColumnLayout),
  },
};

// // data driven example
// const dummyFeed = {
//   hotel_net_room_nights: 100,
//   hotel_net_room_nights_growth: 0.8, // percent
//   hotel_conversion: 0.6, // percent
//   hotel_pricing_health: 0.8, // percent
//   hotel_adr: 100,
//   hotel_adr_ly: 120,
//   hotel_adr_growth: -0.2, // percent
//   hotel_impressions: 234000,
//   hotel_content_score: 90,
//   hotel_review_score: 8,

//   comp_set_net_room_nights: 100,
//   comp_set_net_room_nights_growth: -0.8, // percent
//   comp_set_conversion: 0.6, // percent
//   comp_set_pricing_health: 0.8, // percent
//   comp_set_adr: 100,
//   comp_set_adr_ly: 120,
//   comp_set_adr_growth: -0.2, // percent
//   comp_set_impressions: 234000,
//   comp_set_content_score: 90,
//   comp_set_review_score: '8.8 - 7.9',

//   diff_net_room_nights: 0.4, // percent
//   diff_conversion: 0.6, // percent
//   diff_pricing_health: 0.8, // percent
//   diff_adr: -0.25, // percent
//   diff_impressions: -0.26, // percent
// };

// // outputs columns / rows from a feed input - specific to a feed / slide
// const tableConfig = propertyAnalysisToTableConfig(
//   dummyFeed,
//   '<< hotel name >>',
// );
// // takes columns / rows - generic table builder
// const { rows, columns } = tableConfig;

// export const DataProcessing = {
//   args: {
//     label: 'Default',
//     rows,
//     columns,
//   },
// };
