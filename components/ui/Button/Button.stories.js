import React from 'react';
import { CalendarIcon } from '../../icons';
import { Button } from './Button';

export default {
  component: Button,
  title: 'Components/UI/Button',
};

const ButtonTemplate = {
  render: function Render(args) {
    return <Button {...args} onClick={() => {}} />;
  },
};

export const Default = {
  ...ButtonTemplate,
  args: {
    label: 'Click me',
  },
};

export const LeftIcon = {
  ...ButtonTemplate,
  args: {
    label: 'Click me',
    leftIcon: <CalendarIcon />,
  },
};

export const RightIcon = {
  ...ButtonTemplate,
  args: {
    label: 'Click me',
    rightIcon: <CalendarIcon />,
  },
};

export const SecondaryLeftIcon = {
  ...ButtonTemplate,
  args: {
    label: 'Click me',
    leftIcon: <CalendarIcon />,
    variant: 'secondary',
  },
};

export const TextLeftIcon = {
  ...ButtonTemplate,
  args: {
    label: 'Click me',
    leftIcon: <CalendarIcon />,
    variant: 'text',
  },
};
