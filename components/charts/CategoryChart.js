/* eslint no-param-reassign: [
  "error",
  { "props": true, "ignorePropertyModificationsFor": ["chart"] }
] */

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
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
  showCursor,
  label,
  tooltips,
  colors,
  themeFunctions,
  chartFunction,
  enableAnimation,
  onReady,
}) {
  const combinedThemeFuncs = useChartTheme(themeFunctions);

  const chartFunc = useCallback(
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

      const chartSeries = createSeries(chart, {
        tooltips,
        colors,
        dataFields: { yAxis: 'valueY', xAxis: 'categoryX' },
        seriesOptions: series,
        yAxes: yAxisCollection,
      });

      let cursor;
      let legend;

      if (showLegend) {
        legend = createLegend();
        chart.legend = legend;
      }

      if (showCursor) {
        cursor = createCursor(xAxisObj);
        chart.cursor = cursor;
      }

      if (label) {
        applyLabel(chart, label);
      }

      chartFunction(chart, chartSeries, { cursor, legend });
    },
    [
      series,
      tooltips,
      colors,
      label,
      xAxis,
      yAxes,
      showLegend,
      showCursor,
      chartFunction,
    ],
  );

  return (
    <BaseChart
      className={className}
      themeFunctions={combinedThemeFuncs}
      chartFunction={chartFunc}
      enableAnimation={enableAnimation}
      data={data}
      width={width}
      height={height}
      onReady={onReady}
    />
  );
}

CategoryChart.propTypes = {
  ...baseChartProps,
  chartFunction: PropTypes.func,
};

CategoryChart.defaultProps = {
  ...baseChartDefaultProps,
  chartFunction: () => {},
};
