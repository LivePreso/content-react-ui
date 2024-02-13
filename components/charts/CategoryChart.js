/* eslint no-param-reassign: [
  "error",
  { "props": true, "ignorePropertyModificationsFor": ["chart"] }
] */

import React, { useCallback } from 'react';
import { useChartTheme } from '@ui/hooks/use-chart-theme';
import { BaseChart } from './BaseChart';
import {
  baseChartProps,
  baseChartDefaultProps,
  createValueYAxis,
  createCategoryXAxis,
  createSeries,
  createLegend,
  createCursor,
} from './chart-utils';

/**
 * Chart with category x-axis (name) & value y-axes (number)
 */
export function CategoryChart({
  series,
  xAxis,
  yAxes,
  data,
  width,
  height,
  tooltips,
  themeFunctions,
}) {
  const combinedThemeFuncs = useChartTheme(themeFunctions, false);

  const chartFunction = useCallback(
    (chart) => {
      const xAxisObj = createCategoryXAxis(chart, {
        key: series[0].dataFieldX,
        ...xAxis,
      });
      const yAxisCollection = yAxes.map((axis) => ({
        key: axis.key,
        axis: createValueYAxis(chart, axis),
      }));

      createSeries(chart, {
        tooltips,
        dataFields: { yAxis: 'valueY', xAxis: 'categoryX' },
        seriesOptions: series,
        yAxes: yAxisCollection,
      });

      chart.legend = createLegend();
      chart.cursor = createCursor(xAxisObj);
    },
    [series, tooltips, xAxis, yAxes],
  );

  return (
    <BaseChart
      themeFunctions={combinedThemeFuncs}
      chartFunction={chartFunction}
      data={data}
      width={width}
      height={height}
    />
  );
}

CategoryChart.propTypes = {
  ...baseChartProps,
};

CategoryChart.defaultProps = {
  ...baseChartDefaultProps,
};
