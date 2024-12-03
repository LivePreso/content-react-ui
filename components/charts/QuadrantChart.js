/* eslint no-param-reassign: [
  "error",
  { "props": true, "ignorePropertyModificationsFor": ["chart"] }
] */

import React, { useCallback, useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import { useChartTheme } from '@ui/hooks/use-chart-theme';
import PropTypes from 'prop-types';
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
} from './utils/xy-chart-utils';

const axisLabelledLowHigh = (label, target) => {
  if (target.dataItem.values.value.value === 0) {
    return 'Low';
  }
  if (target.dataItem.values.value.value === 100) {
    return 'High';
  }
  return '';
};

function getType(value) {
  return value.match(/_([a-z]+)$/)?.[1];
}

const getChartMinMax = (data) =>
  Object.keys(data).reduce((_ranges, key) => {
    const ranges = _ranges;
    const value = data[key];
    const type = getType(key);

    ranges[type] = ranges[type] || { min: Infinity, max: 0 };

    if (ranges[type].min > value) {
      ranges[type].min = value;
    }

    if (ranges[type].max <= value) {
      ranges[type].max = value;
    }

    return ranges;
  }, {});

// We want both axis to be in the range of 0 - 100
// to keep grid lines symmetrical, this makes us
// have to normalize data in a 0-100 range.
// However we add padding to avoid having data points
// on the edges so this is the current normalization logic:
//
// normalizedValue = padding + (maxTargetValue * realValue) / maxRealValue
// value = 10 + (80 * inputX) / maxX
const normalizeValue = (value, max) => {
  return 10 + (80 * value) / max;
};

const denormalizeValue = (value, max) => {
  return ((value - 10) / 80) * max;
};

const normalizeData = (data, chartDataMinMax) =>
  Object.keys(data).reduce((normalized, key) => {
    const value = data[key];
    const type = getType(key);
    // eslint-disable-next-line no-param-reassign
    normalized[key] = normalizeValue(value, chartDataMinMax[type].max);
    return normalized;
  }, {});

/**
 * Chart with value x-axis (value) & value y-axes (number)
 * Plot area is visually divided into 4 equal quadrants with optional labels
 */
export function QuadrantChart({
  className,
  series,
  quadrants = [],
  xAxis,
  yAxes,
  data,
  width,
  height,
  showLegend,
  showCursor,
  tooltips,
  colors,
  themeFunctions,
  chartFunction,
  enableAnimation,
  onReady,
}) {
  const combinedThemeFuncs = useChartTheme(themeFunctions);
  const [normalizedChartData, setNormalizedChartData] = useState([]);
  const [chartMinMaxValues, setChartMinMaxValues] = useState({});

  useEffect(() => {
    const chartDataMinMax = getChartMinMax(data);
    setChartMinMaxValues(chartDataMinMax);
    setNormalizedChartData(normalizeData(data, chartDataMinMax));
  }, [data]);

  const chartFunc = useCallback(
    (chart) => {
      // We want both axis to be in the range of 0 - 100
      // to keep grid lines symmetrical
      const resolvedXAxis = {
        ...xAxis,
        max: 100,
        min: 0,
        overrideFunction: (axis) => {
          axis.renderer.labels.template.adapter.add(
            'text',
            axisLabelledLowHigh,
          );
          // eslint-disable-next-line no-param-reassign
          axis.cursorTooltipEnabled = false;
        },
      };

      const xAxisObj = createValueXAxis(chart, {
        ...resolvedXAxis,
        isQuadrant: true,
      });
      const yAxisCollection = yAxes.map((yAxis) => {
        const resolvedYAxis = {
          ...yAxis,
          max: 100,
          min: 0,
          overrideFunction: (axis) => {
            axis.renderer.labels.template.adapter.add(
              'text',
              axisLabelledLowHigh,
            );
            // eslint-disable-next-line no-param-reassign
            axis.cursorTooltipEnabled = false;
          },
        };
        return {
          key: yAxis.key,
          axis: createValueYAxis(chart, { ...resolvedYAxis, isQuadrant: true }),
        };
      });

      applyChartColors(chart, colors);

      const seriesInstances = createSeries(chart, {
        tooltips: {
          // text: '{categoryY}: {valueY}\n{}: {valueX}',
          ...tooltips,
        },
        colors,
        dataFields: { yAxis: 'valueY', xAxis: 'valueX' },
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

      if (tooltips.active) {
        addValueChartTooltips(xAxisObj);
      }

      const yFormatter = tooltips.yFormatter || ((v) => v);

      seriesInstances.forEach((seriesInstance) => {
        seriesInstance.adapter.add('tooltipText', (text, target) => {
          const yKey = getType(target.dataFields.valueY);

          const valueY = yFormatter(
            denormalizeValue(
              target.tooltipDataItem.valueY,
              chartMinMaxValues[yKey].max,
            ),
          );
          return `[${seriesInstance.fill.hex}]●[/] [bold]${seriesInstance.name}[/]\n [bold]${target.yAxis.title.text}:[/] ${valueY} `;
        });
      });

      quadrants.forEach((quadrant) => {
        const label = chart.createChild(am4core.Label);
        label.isMeasured = false;

        label.background.fill = am4core.color('#f6f8fc');
        label.fill = am4core.color('#abb4c9');
        label.padding(4, 8, 4, 8);

        Object.keys(quadrant.label).forEach((key) => {
          label[key] = quadrant.label[key];
        });
      });

      chartFunction(chart, seriesInstances, { cursor, legend });
    },
    [
      quadrants,
      series,
      tooltips,
      colors,
      xAxis,
      yAxes,
      chartMinMaxValues,
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
      data={[normalizedChartData]}
      width={width}
      height={height}
      onReady={onReady}
    />
  );
}

QuadrantChart.propTypes = {
  ...baseChartProps,
  chartFunction: PropTypes.func,
  quadrants: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string,
    }),
  ),
};

QuadrantChart.defaultProps = {
  ...baseChartDefaultProps,
  chartFunction: () => {},
};
