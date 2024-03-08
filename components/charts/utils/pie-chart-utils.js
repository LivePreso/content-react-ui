/* eslint no-param-reassign: [
  "error",
  { "props": true, "ignorePropertyModificationsFor": ["axis", "series", "xAxis"] }
] */

import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

export const baseChartProps = {
  className: PropTypes.string,
  /** AMcharts 4 theme function */
  themeFunctions: PropTypes.arrayOf(PropTypes.func),
  onReady: PropTypes.func,
  label: PropTypes.exact({
    text: PropTypes.string,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.number,
  }),
  tooltips: PropTypes.exact({
    active: PropTypes.bool,
    text: PropTypes.string,
  }),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showLegend: PropTypes.bool,
  radius: PropTypes.number,
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
  className: null,
  themeFunctions: [],
  onReady: () => {},
  label: null,
  tooltips: {
    active: false,
  },
  width: '100%',
  height: '100%',
  showLegend: false,
  radius: 85,
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
    numberFormat,
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
    series.slices.template.tooltipText =
      tooltips.text || `{category}: {value.formatNumber("${numberFormat}")}`;
    // TODO: tooltip styling options
  } else {
    series.slices.template.states.getKey('hover').properties.scale = 1;
    series.slices.template.states.getKey('active').properties.shiftRadius = 0;
    series.slices.template.tooltipText = '';
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

export function applyLabel(
  chart,
  { text = '', fontSize = 26, fontWeight = 'normal' } = {},
) {
  const label = chart.seriesContainer.createChild(am4core.Label);
  label.horizontalCenter = 'middle';
  label.verticalCenter = 'middle';
  label.text = text;
  label.fontSize = fontSize;
  label.fontWeight = fontWeight;
  return label;
}
