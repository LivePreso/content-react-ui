import React from 'react';
import { useArgs } from '@storybook/preview-api';
import { Toggle } from './Toggle';

export default {
  component: Toggle,
  title: 'Components/UI/Toggle',
};

export const Default = {
  args: {
    label: 'Toggle',
    active: false,
  },
  render: function Render(args) {
    const [{ active }, updateArgs] = useArgs();

    const onChange = () => {
      updateArgs({ active: !active });
    };

    return <Toggle {...args} onChange={onChange} active={active} />;
  },
};
