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
} from './utils/xy-chart-utils';

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
  showLegend,
  enableCursor,
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

      if (enableCursor) {
        chart.cursor = createCursor(xAxisObj);
      }
    },
    [series, tooltips, colors, xAxis, yAxes, showLegend, enableCursor],
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
  enableCursor: PropTypes.bool,
};

CategoryChart.defaultProps = {
  ...baseChartDefaultProps,
  enableCursor: false,
};
