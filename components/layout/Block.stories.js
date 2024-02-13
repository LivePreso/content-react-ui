import React from 'react';
import { Block } from './Block';

export default {
  component: Block,
  title: 'Components/Layout/Block',
};

export const Default = {
  args: {
    children: (
      <>
        <h3>Title</h3>
        <p>Lorem Ipsum</p>
      </>
    ),
  },
};

export const HasBorder = {
  args: {
    ...Default.args,
    hasBorder: true,
  },
};
