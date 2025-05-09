import React from 'react';
import { Header, Content, Footer } from '..';
import { Slide } from './Slide';

export default {
  component: Slide,
  title: 'Components/Slides/Slide',
  decorators: [
    (Story) => (
      <div style={{ width: 1920, height: 1080, zoom: '50%' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    children: (
      <>
        <Header>Slide header</Header>,
        <Content>
          <p>Content</p>
        </Content>
        ,<Footer>Disclaimer & footer</Footer>
      </>
    ),
  },
};
