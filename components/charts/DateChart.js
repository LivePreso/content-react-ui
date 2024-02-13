/* eslint no-param-reassign: [
  "error",
  { "props": true, "ignorePropertyModificationsFor": ["chart"] }
] */

import React, { useCallback } from 'react';
import { BaseChart } from './BaseChart';
import {
  baseChartProps,
  baseChartDefaultProps,
  createValueYAxis,
  createDateXAxis,
  createSeries,
  createLegend,
  createCursor,
} from './chart-utils';

/**
 * Chart with date x-axis (date) & value y-axes (number)
 */
export function DateChart({
  series,
  xAxis,
  yAxes,
  data,
  width,
  height,
  tooltips,
  themeFunctions,
}) {
  const chartFunction = useCallback(
    (chart) => {
      const xAxisObj = createDateXAxis(chart, xAxis);
      const yAxisCollection = yAxes.map((axis) => ({
        key: axis.key,
        axis: createValueYAxis(chart, axis),
      }));

      createSeries(chart, {
        tooltips,
        dataFields: { yAxis: 'valueY', xAxis: 'dateX' },
        seriesOptions: series,
        yAxes: yAxisCollection,
        granularity: xAxis.granularity,
      });

      chart.legend = createLegend();
      chart.cursor = createCursor(xAxisObj);
    },
    [series, tooltips, xAxis, yAxes],
  );

  return (
    <BaseChart
      themeFunctions={themeFunctions}
      chartFunction={chartFunction}
      data={data}
      width={width}
      height={height}
    />
  );
}

DateChart.propTypes = {
  ...baseChartProps,
};

DateChart.defaultProps = {
  ...baseChartDefaultProps,
};
