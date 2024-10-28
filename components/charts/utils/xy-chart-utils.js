/* eslint no-param-reassign: [
  "error",
  { "props": true, "ignorePropertyModificationsFor": ["chart", "axis", "series", "xAxis"] }
] */

import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

export const baseChartProps = {
  className: PropTypes.string,
  /** AMcharts 4 theme function */
  themeFunctions: PropTypes.arrayOf(PropTypes.func),
  onReady: PropTypes.func,
  showLegend: PropTypes.bool,
  label: PropTypes.exact({
    text: PropTypes.string,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.number,
  }),
  tooltips: PropTypes.exact({
    active: PropTypes.bool,
    combineSeries: PropTypes.bool,
    text: PropTypes.string,
    xFormatter: PropTypes.func,
    yFormatter: PropTypes.func,
    // TODO: Investigate always having tooltips turned on
    // TODO: alwaysShow doesn't work with value axis x + y together
    // alwaysShow: PropTypes.bool,
  }),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  colors: PropTypes.exact({
    list: PropTypes.arrayOf(PropTypes.string),
    applyToEachSeries: PropTypes.bool,
  }),
  series: PropTypes.arrayOf(
    PropTypes.exact({
      type: PropTypes.oneOf(['line', 'column', 'bubble']).isRequired,
      name: PropTypes.string,
      valueAxisKey: PropTypes.string,
      showValue: PropTypes.bool,
      useBullets: PropTypes.bool,
      /**
       * https://www.amcharts.com/docs/v4/concepts/formatters/formatting-numbers/
       */
      numberFormat: PropTypes.string,
      dataFieldX: PropTypes.string.isRequired,
      dataFieldY: PropTypes.string.isRequired,
      dataFieldName: PropTypes.string,
      /**
       * Available 'line' and 'bubble' series
       */
      dataFieldHeat: PropTypes.string,
    }),
  ).isRequired,
  xAxis: PropTypes.exact({
    title: PropTypes.string,
    name: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    extraMinMax: PropTypes.number,
    numberFormat: PropTypes.string,
    granularity: PropTypes.oneOf(['day', 'week', 'month', 'quarter']),
    hideGrid: PropTypes.bool,
    hideLabels: PropTypes.bool,
    /**
     * Exposes "axis" to allow for setting custom config/adapters
     */
    overrideFunction: PropTypes.func,
  }),
  yAxes: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string,
      name: PropTypes.string,
      key: PropTypes.string.isRequired,
      opposite: PropTypes.bool,
      min: PropTypes.number,
      max: PropTypes.number,
      extraMinMax: PropTypes.number,
      hideGrid: PropTypes.bool,
      hideLabels: PropTypes.bool,
      /**
       * https://www.amcharts.com/docs/v4/concepts/formatters/formatting-numbers/
       */
      numberFormat: PropTypes.string,
      /**
       * Exposes "axis" to allow for setting custom config/adapters
       */
      overrideFunction: PropTypes.func,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ),
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
  colors: {
    list: [],
    applyToEachSeries: false,
  },
  xAxis: {},
  data: [],
};

function getSeriesType(type) {
  switch (type) {
    case 'line':
    case 'bubble':
      return 'LineSeries';
    case 'column':
    default:
      return 'ColumnSeries';
  }
}

// Value Axis
function createValueAxis(
  chart,
  direction = 'y',
  {
    title = '',
    numberFormat = null,
    min = null,
    max = null,
    extraMinMax = null,
    isQuadrant = false,
    overrideFunction = null,
    hideGrid = false,
    hideLabels = false,
  } = {},
) {
  const axis = chart[`${direction}Axes`].push(new am4charts.ValueAxis());
  axis.title.text = title;
  axis.cursorTooltipEnabled = false;
  axis.renderer.grid.template.disabled = hideGrid;
  axis.renderer.labels.template.disabled = hideLabels;

  if (direction === 'y') {
    axis.renderer.baseGrid.stroke = am4core.color('#abb4c9');
    axis.renderer.baseGrid.strokeWidth = 2;
    axis.renderer.baseGrid.strokeOpacity = 1;
  }

  if (min !== null) axis.min = min;
  if (max !== null) axis.max = max;
  if (!extraMinMax && (min !== null || max !== null)) axis.strictMinMax = true;
  if (extraMinMax && extraMinMax > 0) {
    axis.extraMin = extraMinMax;
    axis.extraMax = extraMinMax;
  }

  if (numberFormat) {
    axis.numberFormatter = new am4core.NumberFormatter();
    axis.numberFormatter.numberFormat = numberFormat;
  }

  if (isQuadrant && max !== null) {
    const range = axis.axisRanges.create();
    range.value = max / 2;
    range.grid.stroke = am4core.color('#abb4c9');
    range.grid.strokeWidth = 2;
    range.grid.strokeOpacity = 1;
  }

  if (overrideFunction) {
    // expose axis object to allow setting custom config/adapters
    overrideFunction(axis);
  }

  return axis;
}

export function createValueYAxis(chart, { opposite = false, ...options } = {}) {
  const axis = createValueAxis(chart, 'y', options);

  axis.renderer.opposite = opposite || false;

  if (!options.hideLabels) {
    if (opposite) {
      axis.title.marginLeft = 50;
    } else {
      axis.title.marginRight = 50;
    }
  }

  if (chart.yAxes.indexOf(axis) > 0) {
    axis.syncWithAxis = chart.yAxes.getIndex(0);
  }

  return axis;
}

export function createValueXAxis(chart, options = {}) {
  return createValueAxis(chart, 'x', options);
}

// Category axis
function createCategoryAxis(
  chart,
  direction = 'x',
  { key = 'category', title = '', hideGrid = false, hideLabels = false } = {},
) {
  const axis = chart[`${direction}Axes`].push(new am4charts.CategoryAxis());
  axis.dataFields.category = key;
  axis.title.text = title;
  axis.renderer.cellStartLocation = 0.2;
  axis.renderer.cellEndLocation = 0.8;
  axis.renderer.grid.template.disabled = hideGrid;
  axis.renderer.labels.template.disabled = hideLabels;
  axis.cursorTooltipEnabled = false;
  return axis;
}

export function createCategoryXAxis(chart, options) {
  return createCategoryAxis(chart, 'x', options);
}

export function createCategoryYAxis(chart, options) {
  return createCategoryAxis(chart, 'y', options);
}

// Date axis
// https://www.amcharts.com/docs/v4/concepts/axes/date-axis/
// https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/
const dateKeys = ['day', 'week', 'month', 'year'];

const dateFormats = {
  day: {
    format: 'MMM d',
    periodChange: "MMM d ''yy",
    tooltip: 'MMM d yyyy',
  },
  week: {
    format: "'W'w",
    periodChange: "'W'w ''yy",
    tooltip: "'W'w MMM d yyyy",
  },
  month: {
    format: 'MMM',
    periodChange: "MMM ''yy",
    tooltip: 'MMM yyyy',
  },
  quarter: {
    format: "'Q'q",
    periodChange: "'Q'q ''yy",
    tooltip: "'Q'q yyyy",
  },
  year: {
    format: 'yyyy',
    periodChange: 'yyyy',
    tooltip: 'yyyy',
  },
};

// TODO: labels appear in between data entries for the quarter
// Need to find a solution...
function setDateFormat(axis, granularity) {
  for (const index in dateKeys) {
    if (dateKeys.includes(dateKeys[index])) {
      const key = dateKeys[index];
      axis.dateFormats.setKey(key, dateFormats[granularity].format);
      axis.periodChangeDateFormats.setKey(
        key,
        dateFormats[granularity].periodChange,
      );
    }
  }

  if (granularity !== 'quarter') {
    axis.baseInterval = {
      count: granularity === 'quarter' ? 3 : 1,
      timeUnit: granularity === 'quarter' ? 'month' : granularity,
    };
  }
}

function createDateAxis(
  chart,
  direction = 'x',
  {
    title = '',
    granularity = 'month',
    hideGrid = false,
    hideLabels = false,
  } = {},
) {
  const axis = chart[`${direction}Axes`].push(new am4charts.DateAxis());
  axis.title.text = title;
  setDateFormat(axis, granularity);

  axis.renderer.cellStartLocation = 0.2;
  axis.renderer.cellEndLocation = 0.8;
  axis.renderer.grid.template.disabled = hideGrid;
  axis.renderer.labels.template.disabled = hideLabels;
  if (granularity === 'day' || granularity === 'week') {
    axis.renderer.minGridDistance = 30;
    // TODO: investigate changing this dynamically if needed
    // https://www.amcharts.com/docs/v4/tutorials/wrapping-and-truncating-axis-labels/#Auto_rotating_labels
    axis.renderer.labels.template.rotation = -90;
    axis.renderer.labels.template.horizontalCenter = 'right';
  }
  // TODO: Investigate calling out year on change
  // https://www.amcharts.com/docs/v4/tutorials/force-first-and-last-labels-on-axis/
  axis.cursorTooltipEnabled = false;

  return axis;
}

export function createDateXAxis(chart, options) {
  return createDateAxis(chart, 'x', options);
}

export function createDateYAxis(chart, options) {
  return createDateAxis(chart, 'y', options);
}

// Series
function applyColumnOptions(series) {
  series.columns.template.width = am4core.percent(100);
}

function applyLineOptions(series, { useBullets, fillOpacity } = {}) {
  series.fillOpacity = fillOpacity;
  series.strokeWidth = 2;

  if (useBullets) {
    const bullet = series.bullets.push(new am4charts.Bullet());
    const circle = bullet.createChild(am4core.Circle);
    circle.height = 8;
    circle.width = 8;
  }
}

function applyBubbleOptions(series, { useHeatMap } = {}) {
  series.fillOpacity = 0;
  series.strokeWidth = 0;

  const bullet = series.bullets.push(new am4charts.CircleBullet());

  if (useHeatMap) {
    series.heatRules.push({
      target: bullet.circle,
      min: 10,
      max: 60,
      property: 'radius',
    });
  } else {
    bullet.radius = 8;
  }
}

export function applyChartColors(chart, colors = {}) {
  if (colors.list?.length) {
    chart.colors.list = colors.list.map((color) => am4core.color(color));
  }
}

function applySeriesColors(chart, { type, series }) {
  if (type === 'column') {
    series.columns.template.adapter.add('fill', (fill, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    series.columns.template.adapter.add('stroke', (stroke, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });
  }

  if (type === 'line' || type === 'bubble') {
    series.bullets.template.adapter.add('fill', (fill, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    series.lines.template.adapter.add('stroke', (stroke, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });
  }
}

export function createSeries(
  chart,
  {
    tooltips = {},
    colors = {},
    dataFields,
    seriesOptions,
    yAxes,
    granularity = 'month',
  } = {},
) {
  const seriesWithAxis = seriesOptions.map((ser) => {
    let yAxis = yAxes.find((axis) => axis.key === ser.valueAxisKey);
    if (!yAxis) yAxis = { axis: yAxes[0].axis };

    return {
      ...ser,
      valueAxis: yAxis.axis,
    };
  });

  return seriesWithAxis.map((options) => {
    const {
      type = 'column',
      dataFieldX,
      dataFieldY,
      dataFieldName,
      dataFieldHeat = null,
      valueAxis,
      useBullets = false,
      zIndex = null,
      name = '',
      fillOpacity = 0,
      numberFormat = null,
      showValue = false,
    } = options;

    const series = chart.series.push(new am4charts[getSeriesType(type)]());
    series.name = name;
    series.zIndex = zIndex || 1;

    if (type === 'column') {
      applyColumnOptions(series);
    }

    if (type === 'line') {
      applyLineOptions(series, { useBullets, fillOpacity });
    }

    if (type === 'bubble') {
      applyBubbleOptions(series, { useHeatMap: Boolean(dataFieldHeat) });
    }

    if (colors.applyToEachSeries) {
      applySeriesColors(chart, { type, series });
    }

    if (showValue) {
      // Graph value labels
      const bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = type === 'bubble' ? 0 : -18;
      let labelText = dataFieldName ? '{name}' : '{valueY}';

      if (numberFormat && !dataFieldName) {
        labelText = `{valueY.formatNumber('${numberFormat}')}`;
      }

      bullet.label.text = labelText;
      bullet.label.fill = '#000000';
    }

    series.dataFields[dataFields.xAxis] = dataFieldX;
    series.dataFields[dataFields.yAxis] = dataFieldY;
    if (dataFieldHeat) {
      series.dataFields.name = dataFieldName;
      series.dataFields.value = dataFieldHeat;
    }

    series.yAxis = valueAxis;

    // Tooltips
    if (tooltips.active) {
      series.tooltipText =
        tooltips.text ||
        `{${dataFields.xAxis}}: {${dataFields.yAxis}.formatNumber("${numberFormat}")}`;
      // TODO: tooltip styling options

      // TODO: Doesn't work for double x + y value axis
      // if (tooltips.alwaysShow) {
      //   series.showTooltipOn = 'always';
      // }

      if (tooltips.combineSeries) {
        series.adapter.add('tooltipText', () => {
          const formatDate = dateFormats[granularity].tooltip;
          let text = '';

          if (dataFields.xAxis.indexOf('date') === 0) {
            text += `[bold]{dateX.formatDate("${formatDate}")}`;
            if (tooltips.includeComparisonDate) {
              text += ` vs. {date_ly.formatDate("${formatDate}")}[/]\n`;
            } else {
              text += `\n`;
            }
          }

          chart.series.each((item, idx) => {
            if (!item.isHidden) {
              const itemOptions = seriesOptions[idx];
              text += `[${item.stroke.hex}]●[/] [bold]${item.name}:[/] {${
                item.dataFields.valueY
              }.formatNumber("${itemOptions.numberFormat || '#,###.##'}"")}\n`;
            }
          });
          return text;
        });
      }
    }

    // End
    return series;
  });
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

export function createCursor(xAxis) {
  const cursor = new am4charts.XYCursor();
  cursor.xAxis = xAxis;
  cursor.lineY.disabled = true;
  cursor.lineX.disabled = true;
  // Disable zoom and pan until time allows for
  // remote preso integration
  cursor.behavior = 'none';
  // tooltip hack to get only one showing at a time
  cursor.maxTooltipDistance = -1;
  return cursor;
}

export function applyLabel(
  chart,
  { text = '', fontSize = 26, fontWeight = 400 } = {},
) {
  const label = chart.createChild(am4core.Label);
  label.align = 'center';
  label.marginTop = 15;
  label.text = text;
  label.fontSize = fontSize;
  label.fontWeight = fontWeight;
  return label;
}

/**
 * Tooltips do not work out of the box for value xAxis
 * https://www.amcharts.com/docs/v4/tutorials/multiple-cursor-tooltips-on-scatter-chart/
 */
export function addValueChartTooltips(xAxis) {
  if (xAxis) {
    xAxis.getSeriesDataItem = (seri, position) => {
      const key = xAxis.axisFieldName + xAxis.axisLetter;
      const value = xAxis.positionToValue(position);
      const dataItem = seri.dataItems.getIndex(
        seri.dataItems.findClosestIndex(
          value,
          (x) => (x[key] ? x[key] : undefined),
          'any',
        ),
      );
      return dataItem;
    };
  }
}
