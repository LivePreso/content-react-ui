import React from 'react';
import { Row, Block } from './index';

export default {
  component: Row,
  title: 'Components/Layout/Row',
};

export const Default = {
  args: {
    gap: 'flex-between',
    children: [
      <div key="item-1">
        <p>Item one</p>
      </div>,
      <div key="item-2">
        <p>Item two</p>
      </div>,
      <div key="item-3">
        <p>Item three</p>
      </div>,
    ],
  },
};

export const FlexBlocks = {
  args: {
    gap: 'medium',
    children: [
      <Block key="block-1" flex={1}>
        <p>Item one</p>
      </Block>,
      <Block key="block-2" flex={2}>
        <p>Item two</p>
      </Block>,
    ],
  },
};
