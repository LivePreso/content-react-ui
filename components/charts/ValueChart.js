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
  addValueChartTooltips,
  applyChartColors,
  applyLabel,
} from './utils/xy-chart-utils';

/**
 * Chart with value x-axis (number) & value y-axes (number)
 */
export function ValueChart({
  className,
  series,
  xAxis,
  yAxes,
  data,
  width,
  height,
  showLegend,
  label,
  tooltips,
  colors,
  themeFunctions,
  onReady,
}) {
  const combinedThemeFuncs = useChartTheme(themeFunctions);

  const chartFunction = useCallback(
    (chart) => {
      const xAxisObj = createValueXAxis(chart, xAxis);
      const yAxisCollection = yAxes.map((axis) => ({
        key: axis.key,
        axis: createValueYAxis(chart, axis),
      }));

      applyChartColors(chart, colors);

      createSeries(chart, {
        tooltips: {
          text: '{name}: {valueY}\n{name}: {valueX}',
          ...tooltips,
        },
        colors,
        dataFields: { yAxis: 'valueY', xAxis: 'valueX' },
        seriesOptions: series,
        yAxes: yAxisCollection,
      });

      if (tooltips.active) {
        addValueChartTooltips(xAxisObj);
      }
      if (showLegend) {
        chart.legend = createLegend();
      }

      chart.cursor = createCursor(xAxisObj);

      if (label) {
        applyLabel(chart, label);
      }
    },
    [series, tooltips, colors, label, xAxis, yAxes, showLegend],
  );

  return (
    <BaseChart
      className={className}
      themeFunctions={combinedThemeFuncs}
      chartFunction={chartFunction}
      data={data}
      width={width}
      height={height}
      onReady={onReady}
    />
  );
}

ValueChart.propTypes = {
  ...baseChartProps,
};

ValueChart.defaultProps = {
  ...baseChartDefaultProps,
};
