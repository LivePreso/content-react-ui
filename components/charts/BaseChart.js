/* eslint no-param-reassign: [
  "error",
  { "props": true, "ignorePropertyModificationsFor": ["chart"] }
] */

import { uniqueId, isEqual } from 'lodash-es';
import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

/**
 * The default comparison is shallow equality, so we're using
 * lodash's isEqual for deep comparison instead.
 */
const arePropsEqual = (oldProps, newProps) => {
  // passed-in chartFunction is always different, possibly because of useCallback?
  const { chartFunction: oldChartFunction, ...oldOtherProps } = oldProps;
  const { chartFunction: newChartFunction, ...newOtherProps } = newProps;

  // TODO: find a better way to include chartFunction in the comparison.
  return (
    isEqual(oldOtherProps, newOtherProps) &&
    oldChartFunction.toString() === newChartFunction.toString()
  );
};

function getAMChartType(type) {
  if (type === 'pie') {
    return am4charts.PieChart;
  }

  return am4charts.XYChart;
}

/**
 * Return a memoized component here for performance reasons.
 *
 * React will usually attempt to re-render this whenever the
 * parent has to re-render, by memoizing it we're telling React
 * to only re-render it when necessary (props have changed).
 *
 * See link below for more info.
 * https://react.dev/reference/react/memo
 */
export const BaseChart = React.memo(function BaseChart({
  type,
  chartFunction,
  themeFunctions,
  data,
  width,
  height,
}) {
  const chartRef = useRef(null);
  const id = useRef(uniqueId('amchart'));

  const onInitialize = useCallback(
    function (chart) {
      chartFunction(chart);

      // Prevent bullets on the edge of a chart being cropped
      chart.maskBullets = false;

      if (type === 'xy') {
        // Disable pinch to zoom
        chart.zoomOutButton.disabled = true;
      }
    },
    [chartFunction, type],
  );

  // Chart setup - initial load
  useEffect(() => {
    am4core.unuseAllThemes();
    for (const theme of themeFunctions) {
      if (typeof theme === 'function') {
        am4core.useTheme(theme);
      }
    }

    const amChart = am4core.create(id.current, getAMChartType(type));

    onInitialize(amChart);

    chartRef.current = amChart;

    return () => {
      amChart.dispose();
    };
  }, [type, onInitialize, themeFunctions]);

  useEffect(() => {
    // Handle data updates triggered by state changes
    chartRef.current.data = data;
  }, [data]);

  return <div id={id.current} style={{ width, height }} />;
}, arePropsEqual);

BaseChart.propTypes = {
  type: PropTypes.oneOf(['xy', 'pie']),
  chartFunction: PropTypes.func.isRequired,
  themeFunctions: PropTypes.arrayOf(PropTypes.func),
  width: PropTypes.string,
  height: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ),
};

BaseChart.defaultProps = {
  type: 'xy',
  width: '100%',
  height: '100%',
  themeFunctions: null,
  data: [],
};
