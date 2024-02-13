import React from 'react';
import { Table, Row, Cell } from './Table';

export default {
  component: Table,
  title: 'Components/UI/Table',
};

export const Default = {
  args: {
    label: 'Default',

    children: [
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
      </Row>,
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
      </Row>,
    ],
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
