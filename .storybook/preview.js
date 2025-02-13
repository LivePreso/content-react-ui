import React from 'react';
import '../css/core.scss';
import './styles.scss';
import { useRootSlide } from '@livepreso/content-react/lib/hooks/use-root-slide';
import { SlideContext } from '@livepreso/content-react';
import jQuery from 'jquery';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        order: ['Components'],
      },
    },
  },
  decorators: [
    (Story) => {
      global.Bridge = null;
      const article = document.getElementById('storybook-root');
      const slideState = useRootSlide(jQuery(article));
      return (
        <SlideContext.Provider value={slideState}>
          <Story />
        </SlideContext.Provider>
      );
    },
  ],
};

export default preview;
