import React from 'react';
import { useArgs } from '@storybook/preview-api';
import { ToggleDropdownItem } from './ToggleDropdownItem';

export default {
  component: ToggleDropdownItem,
  title: 'Components/UI/Dropdown/ToggleDropdownItem',
};

export const Default = {
  render: function Render({ ...args }) {
    const [{ value }, updateArgs] = useArgs();

    return (
      <ToggleDropdownItem
        toggleActive={value}
        {...args}
        onToggleChange={(val) => {
          updateArgs({ toggleActive: val });
        }}
      />
    );
  },
  args: {
    label: 'Dropdown item',
  },
};
