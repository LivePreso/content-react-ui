/* eslint no-param-reassign: [
  "error",
  { "props": true, "ignorePropertyModificationsFor": ["chart"] }
] */

import { uniqueId, isEqual } from 'lodash-es';
import React, { useCallback, useEffect, useRef } from 'react';
import { useSlideDone, useModes } from '@livepreso/content-react';
import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
/* eslint-disable-next-line camelcase */
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.options.commercialLicense = true;
am4core.options.autoSetClassName = true;

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
  className,
  type,
  enableAnimation,
  chartFunction,
  themeFunctions,
  data,
  width,
  height,
  onReady,
}) {
  const chartRef = useRef(null);
  const id = useRef(uniqueId('amchart'));
  const slideDone = useSlideDone();
  const { isScreenshot } = useModes();

  const onInitialize = useCallback(
    function (chart) {
      chartFunction(chart);

      // Prevent bullets on the edge of a chart being cropped
      chart.maskBullets = false;

      // Is an XY chart (eg. category, value or date)
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

    if (!isScreenshot && enableAnimation) {
      am4core.useTheme(am4themes_animated);
    }

    const amChart = am4core.create(id.current, getAMChartType(type));

    onInitialize(amChart);

    const chartReady = () => {
      onReady();
      slideDone();
    };

    chartRef.current = amChart;
    amChart.events.on('appeared', chartReady);

    return () => {
      amChart.events.off('appeared', chartReady);
      amChart.dispose();
    };
  }, [
    type,
    onInitialize,
    themeFunctions,
    slideDone,
    onReady,
    enableAnimation,
    isScreenshot,
  ]);

  useEffect(() => {
    // Handle data updates triggered by state changes
    chartRef.current.data = data;
  }, [data]);

  return (
    <div id={id.current} className={className} style={{ width, height }} />
  );
}, arePropsEqual);

BaseChart.propTypes = {
  className: PropTypes.string,
  /* Select between XY chart (eg. category, value, date) or pie chart */
  type: PropTypes.oneOf(['xy', 'pie']),
  enableAnimation: PropTypes.bool,
  chartFunction: PropTypes.func.isRequired,
  themeFunctions: PropTypes.arrayOf(PropTypes.func),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    ),
  ),
  onReady: PropTypes.func,
};

BaseChart.defaultProps = {
  className: null,
  type: 'xy',
  enableAnimation: false,
  width: '100%',
  height: '100%',
  themeFunctions: null,
  data: [],
  onReady: () => {},
};
