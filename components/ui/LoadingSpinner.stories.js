import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export default {
  component: LoadingSpinner,
  title: 'Components/UI/LoadingSpinner',
};

export const Default = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ height: '200px' }}>
        <Story />
      </div>
    ),
  ],
};
