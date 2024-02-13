import React from 'react';
import { Table, Row, Cell } from '@ui/components/ui/Table';
import {
  posNegFactory,
  currencifyFactory,
  percentifyFactory,
} from '@ui/utils/data-formatting';
import { DeltaValue } from './DeltaValue';

const posGreen = posNegFactory({ pos: 'color-brand-3', neg: 'color-brand-4' });
const negGreen = posNegFactory({ pos: 'color-brand-4', neg: 'color-brand-3' });
const percentify = percentifyFactory({ numDecimal: 1 });
const currencify = currencifyFactory({ numDecimal: 2 });

const colourFunctions = {
  'positive is green': posGreen,
  'negative is green': negGreen,
};
const primaryFormatters = {
  percentage: percentify,
  currency: currencify,
};

export default {
  component: DeltaValue,
  title: 'Components/UI/Stats/DeltaValue',
  argTypes: {
    color: {
      options: Object.keys(colourFunctions),
      mapping: colourFunctions,
      control: {
        type: 'select',
      },
    },
    formatter: {
      options: Object.keys(primaryFormatters),
      mapping: primaryFormatters,
      control: {
        type: 'select',
      },
    },
  },
};

export const Default = {
  args: {
    label: 'Default',

    children: [
      <Table>
        <Row>
          <Cell>
            <DeltaValue />
          </Cell>
        </Row>
      </Table>,
    ],

    primary: 0.342,
    color: posGreen,
    formatter: percentify,
    secondary: currencify(100),
  },
};
