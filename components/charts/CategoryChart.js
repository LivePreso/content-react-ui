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
  applyChartColors,
  applyLabel,
} from './utils/xy-chart-utils';

/**
 * Chart with category x-axis (name) & value y-axes (number)
 */
export function CategoryChart({
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
}) {
  const combinedThemeFuncs = useChartTheme(themeFunctions);

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

      applyChartColors(chart, colors);

      createSeries(chart, {
        tooltips,
        colors,
        dataFields: { yAxis: 'valueY', xAxis: 'categoryX' },
        seriesOptions: series,
        yAxes: yAxisCollection,
      });

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
    />
  );
}

CategoryChart.propTypes = {
  ...baseChartProps,
};

CategoryChart.defaultProps = {
  ...baseChartDefaultProps,
};
