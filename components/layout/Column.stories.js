import React from 'react';
import { Column, Block } from './index';

export default {
  component: Column,
  title: 'Components/Layout/Column',
};

export const Default = {
  args: {
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
    gap: 'small',
    align: 'center',
    height: '400px',
    children: [
      <Block key="block-1" flex={1} hasBorder>
        <p>Item one</p>
      </Block>,
      <Block key="block-2" flex={2} hasBorder>
        <p>Item two</p>
      </Block>,
    ],
  },
};
