/* eslint no-param-reassign: [
  "error",
  { "props": true, "ignorePropertyModificationsFor": ["chart"] }
] */

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import { useChartTheme } from '@ui/hooks/use-chart-theme';
import { BaseChart } from './BaseChart';
import {
  baseChartProps,
  baseChartDefaultProps,
  createSeries,
  createLegend,
  applyLabel,
} from './utils/pie-chart-utils';

/**
 * Pie Chart with category (name) & value (number)
 */
export function PieChart({
  className,
  label,
  series,
  data,
  width,
  height,
  tooltips,
  colors,
  showLegend,
  radius,
  innerRadius,
  callout,
  themeFunctions,
  onReady,
  chartFunction,
}) {
  const combinedThemeFuncs = useChartTheme(themeFunctions);

  const chartFunc = useCallback(
    (chart) => {
      const chartSeries = createSeries(chart, {
        tooltips,
        colors,
        seriesOptions: series,
      });

      if (showLegend) {
        chart.legend = createLegend();
      }

      chart.radius = am4core.percent(radius);
      chart.innerRadius = am4core.percent(innerRadius);

      if (callout) {
        // TODO: Add label in center of pie (large stat)
      }

      if (label) {
        applyLabel(chart, label);
      }

      chartFunction(chart, chartSeries);
    },
    [
      series,
      tooltips,
      colors,
      label,
      showLegend,
      radius,
      innerRadius,
      callout,
      chartFunction,
    ],
  );

  return (
    <BaseChart
      className={className}
      type="pie"
      themeFunctions={combinedThemeFuncs}
      chartFunction={chartFunc}
      data={data}
      width={width}
      height={height}
      onReady={onReady}
    />
  );
}

PieChart.propTypes = {
  ...baseChartProps,
  chartFunction: PropTypes.func,
};

PieChart.defaultProps = {
  ...baseChartDefaultProps,
  chartFunction: () => {},
};
