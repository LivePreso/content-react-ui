import React from 'react';
import { useArgs } from '@storybook/preview-api';
import { Checkbox } from './Checkbox';

export default {
  component: Checkbox,
  title: 'Components/UI/Checkbox',
};

export const Default = {
  args: {
    label: 'Checkbox',
    active: false,
  },
  render: function Render(args) {
    const [{ active }, updateArgs] = useArgs();

    const onChange = () => {
      updateArgs({ active: !active });
    };

    return <Checkbox {...args} onChange={onChange} active={active} />;
  },
};
