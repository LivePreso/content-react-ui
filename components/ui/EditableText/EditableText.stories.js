import { EditableText } from './index';

export default {
  component: EditableText,
  title: 'Components/UI/EditableText',
};

export const Prep = {
  args: {
    id: 'test',
    isPrep: true,
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
};

export const Companywide = {
  args: {
    id: 'test',
    isCompany: true,
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
};

export const ReadOnly = {
  args: {
    id: 'test',
    isCompany: true,
    isPrep: true,
    isReadOnly: true,
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
};

export const Label = {
  args: { ...Prep.args, label: "I'm a label" },
};

export const Header1 = {
  args: { ...Prep.args, tag: 'h1' },
};

export const Header2 = {
  args: { ...Prep.args, tag: 'h2' },
};

export const Header3 = {
  args: { ...Prep.args, tag: 'h3' },
};

export const Header4 = {
  args: { ...Prep.args, tag: 'h4' },
};

export const Header5 = {
  args: { ...Prep.args, tag: 'h5' },
};

export const Header6 = {
  args: { ...Prep.args, tag: 'h6' },
};

export const Paragraph = {
  args: { ...Prep.args, tag: 'p' },
};
