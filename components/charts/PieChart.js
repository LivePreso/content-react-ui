/* eslint no-param-reassign: [
  "error",
  { "props": true, "ignorePropertyModificationsFor": ["chart"] }
] */

import React, { useCallback } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import { useChartTheme } from '@ui/hooks/use-chart-theme';
import { BaseChart } from './BaseChart';
import {
  baseChartProps,
  baseChartDefaultProps,
  createSeries,
  createLegend,
} from './utils/pie-chart-utils';

/**
 * Pie Chart with category (name) & value (number)
 */
export function PieChart({
  series,
  data,
  width,
  height,
  tooltips,
  colors,
  showLegend,
  innerRadius,
  callout,
  themeFunctions,
}) {
  const combinedThemeFuncs = useChartTheme(themeFunctions);

  const chartFunction = useCallback(
    (chart) => {
      createSeries(chart, {
        tooltips,
        colors,
        seriesOptions: series,
      });

      if (showLegend) {
        chart.legend = createLegend();
      }

      chart.innerRadius = am4core.percent(innerRadius);

      if (callout) {
        // TODO: Add label in center of pie (large stat)
      }
    },
    [series, tooltips, colors, showLegend, innerRadius, callout],
  );

  return (
    <BaseChart
      type="pie"
      themeFunctions={combinedThemeFuncs}
      chartFunction={chartFunction}
      data={data}
      width={width}
      height={height}
    />
  );
}

PieChart.propTypes = {
  ...baseChartProps,
};

PieChart.defaultProps = {
  ...baseChartDefaultProps,
};
