import React from 'react';
import { MiddleEllipsisText } from './MiddleEllipsisText';

export default {
  component: MiddleEllipsisText,
  title: 'Components/Text/MiddleEllipsisText',
};

export const Default = {
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'This is some long text with a code on the end 05948544',
  },
};

export const NoEllipsis = {
  decorators: [
    (Story) => (
      <div style={{ width: 800 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'This is some long text with a code on the end 05948544',
  },
};

export const NoSpaces = {
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: '17264839384736274960605948373859483736',
  },
};
