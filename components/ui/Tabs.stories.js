// TODO: remove this index key
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { useArgs } from '@storybook/preview-api';
import { userEvent, within } from '@storybook/testing-library';

import { Tab } from './Tab';
import { Tabs } from './Tabs';

export default {
  component: Tabs,
  title: 'Components/UI/Tabs',
};

const TabsTemplate = {
  render: function Render({ ...args }) {
    const [{ value }, updateArgs] = useArgs();

    return (
      <Tabs
        selected={value}
        {...args}
        onChange={(val) => {
          updateArgs({ selected: val });
        }}
      />
    );
  },
};

export const Default = {
  ...TabsTemplate,
  args: {
    selected: 'one',
    items: [
      {
        label: 'Tab one',
        value: 'one',
      },
      {
        label: 'Tab two',
        value: 'two',
      },
      {
        label: 'Tab three',
        value: 'three',
      },
    ],
  },
};

export const RenderItem = {
  args: {
    ...Default.args,
    renderItem: (tab, active) => (
      <Tab
        key={tab.value}
        index={tab.index}
        label={tab.label}
        active={active}
      />
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByRole('tab', { name: 'Tab one' }));
    await userEvent.click(await canvas.findByRole('tab', { name: 'Tab two' }));
    await userEvent.click(
      await canvas.findByRole('tab', { name: 'Tab three' }),
    );
  },
};

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
