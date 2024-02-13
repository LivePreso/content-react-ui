import React from 'react';
import { useArgs } from '@storybook/preview-api';

import { CalendarIcon } from '@ui/components/icons';
import { DropdownItem } from './DropdownItem';
import { Dropdown } from './Dropdown';

export default {
  component: Dropdown,
  title: 'Components/UI/Dropdown',
};

const DropdownDecorators = [
  (Story) => (
    <div style={{ height: '200px' }}>
      <Story />
    </div>
  ),
];

const DropdownTemplate = {
  render: function Render({ ...args }) {
    const [{ value }, updateArgs] = useArgs();

    return (
      <Dropdown
        selected={value}
        {...args}
        onChange={(val) => {
          updateArgs({ selected: val });
        }}
      />
    );
  },
  decorators: [...DropdownDecorators],
};

export const Default = {
  ...DropdownTemplate,
  args: {
    selected: 'yellow',
    icon: <CalendarIcon />,
    options: [
      {
        label: 'Yellow',
        value: 'yellow',
      },
      {
        label: 'Red',
        value: 'red',
      },
      {
        label: 'Pink',
        value: 'pink',
      },
    ],
  },
};

export const RenderItem = {
  args: {
    ...Default.args,
    renderItem: (item) => <DropdownItem key={item.value} label={item.label} />,
  },
  decorators: [...DropdownDecorators],
};
