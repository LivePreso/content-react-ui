import { Tab } from './Tab';

export default {
  component: Tab,
  title: 'Components/UI/Tabs/Tab',
};

export const Default = {
  args: {
    index: 0,
    label: 'Inactive Tab',
    active: false,
  },
};

export const Active = {
  args: {
    index: 0,
    label: 'Active Tab',
    active: true,
  },
};

export const Disabled = {
  args: {
    index: 0,
    label: 'Active Tab',
    active: true,
    disabled: true,
  },
};
