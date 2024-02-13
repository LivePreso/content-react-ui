import React from 'react';
import { useArgs } from '@storybook/preview-api';
import { EditableInput } from './EditableInput';

export default {
  component: EditableInput,
  title: 'Components/UI/EditableInput',
};

export const Default = {
  args: {
    value: 'Initial value',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    function onChange(val) {
      updateArgs({ value: val });
    }

    return (
      <EditableInput {...args} onChange={(v) => onChange(v)} value={value} />
    );
  },
};

export const Readonly = {
  ...Default,
  args: {
    ...Default.args,
    readOnly: true,
    tagName: 'h1',
  },
};

export const P = {
  ...Default,
  args: {
    ...Default.args,
    tagName: 'p',
  },
};

export const H1 = {
  ...Default,
  args: {
    ...Default.args,
    tagName: 'h1',
  },
};

export const H2 = {
  ...Default,
  args: {
    ...Default.args,
    tagName: 'h2',
  },
};

export const H3 = {
  ...Default,
  args: {
    ...Default.args,
    tagName: 'h3',
  },
};

export const H4 = {
  ...Default,
  args: {
    ...Default.args,
    tagName: 'h4',
  },
};

export const H5 = {
  ...Default,
  args: {
    ...Default.args,
    tagName: 'h5',
  },
};

export const H6 = {
  ...Default,
  args: {
    ...Default.args,
    tagName: 'h6',
  },
};
