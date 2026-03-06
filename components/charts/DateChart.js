/* eslint no-param-reassign: [
  "error",
  { "props": true, "ignorePropertyModificationsFor": ["chart"] }
] */

import { defaultsDeep } from 'lodash-es';

import React, { useCallback } from 'react';
import { useChartTheme } from '../../hooks/use-chart-theme';
import { BaseChart } from './BaseChart';
import {
  baseChartProps,
  baseChartDefaultProps,
  createValueYAxis,
  createDateXAxis,
  createSeries,
  createLegend,
  createCursor,
  applyChartColors,
  applyLabel,
} from './utils/xy-chart-utils';

/**
 * Chart with date x-axis (date) & value y-axes (number)
 */
export function DateChart(props) {
  const {
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
    chartFunction,
    enableAnimation,
    onReady,
  } = defaultsDeep({}, props, baseChartDefaultProps);
  const combinedThemeFuncs = useChartTheme(themeFunctions);

  const chartFunc = useCallback(
    (chart) => {
      const xAxisObj = createDateXAxis(chart, xAxis);
      const yAxisCollection = yAxes.map((axis) => ({
        key: axis.key,
        axis: createValueYAxis(chart, axis),
      }));

      applyChartColors(chart, colors);

      const chartSeries = createSeries(chart, {
        tooltips,
        colors,
        dataFields: { yAxis: 'valueY', xAxis: 'dateX' },
        seriesOptions: series,
        yAxes: yAxisCollection,
        granularity: xAxis.granularity,
      });

      if (showLegend) {
        chart.legend = createLegend();
      }

      chart.cursor = createCursor(xAxisObj);

      if (label) {
        applyLabel(chart, label);
      }

      chartFunction(chart, chartSeries);
    },
    [series, tooltips, colors, label, xAxis, yAxes, showLegend, chartFunction],
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

DateChart.propTypes = {
  ...baseChartProps,
};
