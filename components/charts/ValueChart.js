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
  createValueXAxis,
  createValueYAxis,
  createSeries,
  createLegend,
  createCursor,
  AddValueChartTooltips,
} from './chart-utils';

/**
 * Chart with value x-axis (number) & value y-axes (number)
 */
export function ValueChart({
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
      const xAxisObj = createValueXAxis(chart, xAxis);
      const yAxisCollection = yAxes.map((axis) => ({
        key: axis.key,
        axis: createValueYAxis(chart, axis),
      }));

      createSeries(chart, {
        tooltips: {
          text: '{name}: {valueY}\n{name}: {valueX}',
          ...tooltips,
        },
        dataFields: { yAxis: 'valueY', xAxis: 'valueX' },
        seriesOptions: series,
        yAxes: yAxisCollection,
      });

      if (tooltips.active) {
        AddValueChartTooltips(xAxisObj);
      }

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

ValueChart.propTypes = {
  ...baseChartProps,
};

ValueChart.defaultProps = {
  ...baseChartDefaultProps,
};
