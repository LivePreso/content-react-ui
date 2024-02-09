import React from 'react';
import { SectionHeader } from '@deck/components/slide-types';
import { slideDecoratorStyle } from '@deck/js/storybook-utils';

export default {
  component: SectionHeader,
  title: 'components/Slides/SectionHeader',
  decorators: [
    Story => (
      <div style={slideDecoratorStyle}>
        <Story />
      </div>
    )
  ]
};

export const Default = {
  args: {
    title: 'Section header'
  }
};
