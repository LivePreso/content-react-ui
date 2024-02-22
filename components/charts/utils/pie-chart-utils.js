/* eslint no-param-reassign: [
  "error",
  { "props": true, "ignorePropertyModificationsFor": ["axis", "series", "xAxis"] }
] */

import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

am4core.options.commercialLicense = true;
am4core.options.autoSetClassName = true;

export const baseChartProps = {
  /** AMcharts 4 theme function */
  themeFunctions: PropTypes.arrayOf(PropTypes.func),
  tooltips: PropTypes.exact({
    active: PropTypes.bool,
    text: PropTypes.string,
  }),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showLegend: PropTypes.bool,
  innerRadius: PropTypes.number,
  callout: PropTypes.string,
  series: PropTypes.exact({
    name: PropTypes.string,
    hideLabels: PropTypes.bool,
    /**
     * https://www.amcharts.com/docs/v4/concepts/formatters/formatting-numbers/
     */
    numberFormat: PropTypes.string,
    dataFieldCategory: PropTypes.string.isRequired,
    dataFieldValue: PropTypes.string.isRequired,
    dataFieldName: PropTypes.string,
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ),
  colors: PropTypes.exact({
    list: PropTypes.arrayOf(PropTypes.string),
  }),
};

export const baseChartDefaultProps = {
  themeFunctions: [],
  tooltips: {
    active: false,
  },
  width: '100%',
  height: '100%',
  showLegend: false,
  innerRadius: 0,
  callout: null,
  data: [],
  colors: {
    list: [],
  },
};

export function createSeries(
  chart,
  { tooltips = {}, colors = {}, seriesOptions } = {},
) {
  const {
    dataFieldCategory,
    dataFieldValue,
    zIndex = null,
    name = '',
    // fillOpacity = 0,
    hideLabels = false,
  } = seriesOptions;

  const series = chart.series.push(new am4charts.PieSeries());
  series.name = name;
  series.zIndex = zIndex || 1;

  series.labels.template.disabled = hideLabels;
  series.ticks.template.disabled = hideLabels;

  series.dataFields.category = dataFieldCategory;
  series.dataFields.value = dataFieldValue;

  // colors
  if (colors.list?.length) {
    series.colors.list = colors.list.map((color) => am4core.color(color));
  }

  // Tooltips
  if (tooltips.active) {
    series.tooltipText = tooltips.text || `{category}: {value}`;
    series.tooltip.getFillFromObject = false;

    series.tooltip.background.fill = am4core.color('#24262C');
    series.tooltip.label.fill = am4core.color('#fff');
    series.tooltip.background.stroke = am4core.color('#000');
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.label.paddingTop = 12;
    series.tooltip.label.paddingRight = 12;
    series.tooltip.label.paddingBottom = 12;
    series.tooltip.label.paddingLeft = 12;

    series.tooltip.defaultState.transitionDuration = 0;
    series.tooltip.hiddenState.transitionDuration = 0;
  }

  return series;
}

export function createLegend() {
  const legend = new am4charts.Legend();
  legend.useDefaultMarker = true;
  // Disable toggling of legend until time allows for
  // remote preso integration
  legend.itemContainers.template.clickable = false;
  legend.itemContainers.template.focusable = false;
  legend.itemContainers.template.cursorOverStyle =
    am4core.MouseCursorStyle.default;

  const marker = legend.markers.template.children.getIndex(0);
  marker.height = 14;
  marker.width = 14;
  marker.cornerRadius(7, 7, 7, 7);
  marker.dy = 4;
  return legend;
}
