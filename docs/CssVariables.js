import _ from 'lodash-es';
import React from 'react';
import { ColorPalette, ColorItem } from '@storybook/blocks';
import colors from '../css/variables/_colors.scss';

export function CssVariables() {
  const items = Object.entries(colors).filter(([name]) => {
    return name.includes('-');
  });

  const groupedItems = _.groupBy(items, ([name]) => {
    return name.split('-')[1];
  });

  const titleMapping = {
    brand: 'Brand',
    bg: 'Background',
    text: 'Text',
    contrast: 'Contrast',
  };

  return (
    <ColorPalette>
      {Object.entries(groupedItems).flatMap(([key, grouped]) => {
        const chunked = _.chunk(grouped.reverse(), 5).reverse();

        return chunked.flatMap((chunks, index) => {
          const colorDict = chunks.reduce(
            (acc, [k, v]) => ({ [k]: v, ...acc }),
            {},
          );
          return (
            <ColorItem
              title={index === 0 ? titleMapping[key] : ''}
              colors={colorDict}
              key={key}
            />
          );
        });
      })}
    </ColorPalette>
  );
}
