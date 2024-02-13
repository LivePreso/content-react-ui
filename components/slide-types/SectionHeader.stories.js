import React from 'react';
import { SectionHeader } from '@ui/components/slide-types';

export default {
  component: SectionHeader,
  title: 'components/Slides/SectionHeader',
  decorators: [
    (Story) => (
      <div style={{ width: 1920, height: 1080, zoom: '50%' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    title: 'Section header',
  },
};
