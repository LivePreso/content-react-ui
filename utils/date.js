// @ts-check

import { groupBy } from 'lodash-es';

/**
 * Format Date to ISO date string
 * @param {Date} date
 * @returns {string}
 */
export function toDateString(date) {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split('T')[0];
}

/**
 * Get start date of periods by granularity from start and end dates
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {('day'|'week'|'month'|'quarter')} granularity
 * @returns {Date[]} array of dates
 */
export function getStartOfPeriodsByGranularity(
  startDate,
  endDate,
  granularity,
) {
  const dateArray = [];
  const currentDate = moment(startDate);

  // Calculate the next date based on the granularity
  switch (granularity) {
    case 'week':
      currentDate.startOf('isoWeek');
      break;
    case 'month':
      currentDate.startOf('month');
      break;
    case 'quarter':
      currentDate.startOf('quarter');
      break;
    default:
      break;
  }

  // Populate the array with dates up to today
  while (currentDate.isSameOrBefore(moment(endDate), 'day')) {
    dateArray.push(currentDate.toDate());
    switch (granularity) {
      case 'day':
        currentDate.add(1, 'days');
        break;
      case 'week':
        currentDate.add(1, 'weeks');
        break;
      case 'month':
        currentDate.add(1, 'months');
        break;
      case 'quarter':
        currentDate.add(1, 'quarters');
        break;
      default:
        throw Error(`Unsupported granularity: ${granularity}`);
    }
  }

  return dateArray;
}

/**
 * Find date range of specified lookback months from current date
 * @param {Date} deckCreationTime - preso creation time
 * @param {number} lookbackMonths - Month lookback
 * @param {Object} options
 * @param {boolean} [options.includeMonthToDate=false] includeMonthToDate
 * @param {boolean} [options.includeCurrentDate=false] includeCurrentDate
 * @returns {{startDate: Date; endDate: Date;}}
 */
export function getDateRange(
  deckCreationTime,
  lookbackMonths,
  options = { includeMonthToDate: false, includeCurrentDate: false },
) {
  const { includeMonthToDate, includeCurrentDate } = options;
  const currentDate = moment(deckCreationTime);
  const startDate = currentDate
    .clone()
    .subtract(lookbackMonths, 'months')
    .startOf('month')
    .toDate();

  const endDate = includeMonthToDate
    ? currentDate
        .clone()
        .subtract(includeCurrentDate ? 0 : 1, 'days')
        .startOf('day')
        .toDate()
    : currentDate.clone().subtract(1, 'months').endOf('month').toDate();

  return {
    startDate,
    endDate,
  };
}

/**
 * Find date range of specified lookback days from current date
 * @param {Date} deckCreationTime - preso creation time
 * @param {number} lookbackDays
 * @param {boolean} includeCurrentDate
 * @returns {{startDate: Date; endDate: Date;}}
 */
export function getDateRangeByDays(
  deckCreationTime,
  lookbackDays,
  includeCurrentDate = false,
) {
  const currentDate = moment(deckCreationTime);

  const endDate = includeCurrentDate
    ? currentDate.clone()
    : currentDate.clone().subtract(1, 'days');

  const startDate = endDate
    .clone()
    .subtract(lookbackDays, 'days')
    .startOf('day');

  return {
    startDate: startDate.toDate(),
    endDate: endDate.toDate(),
  };
}

/**
 * @param {string} stringDate
 * @param {('day'|'week'|'month'|'quarter')} granularity
 * @returns {string} - date string
 */
function getPeriodStart(stringDate, granularity) {
  const date = new Date(stringDate);

  switch (granularity) {
    case 'day':
      return toDateString(moment(date).startOf('day').toDate());
    case 'month':
      return toDateString(moment(date).startOf('month').toDate());
    case 'week':
      return toDateString(moment(date).startOf('isoWeek').toDate());
    case 'quarter':
      return toDateString(moment(date).startOf('quarter').toDate());
    default:
      throw Error(`Unsupported granularity : ${granularity}`);
  }
}

/**
 * @param {Array<any>} data
 * @param {('day'|'week'|'month'|'quarter')} granularity
 * @returns {Map<String, Array<any>>}
 */
export function groupByGranularity(data, granularity) {
  return groupBy(data, (entry) => {
    return getPeriodStart(entry.bookingDate, granularity);
  });
}

export function getWeekNumberForYear(dateString) {
  return moment(dateString).isoWeek();
}

/**
 * @param {number} weekNumber
 * @param {(number)} year
 * @returns {Date}
 */
export function getStartOfWeek(weekNumber, year) {
  // Create a Moment.js object for the first day of the year
  const startDate = moment({ year, month: 0, day: 1 });

  // Adjust to the first day of the week
  startDate.startOf('isoWeek');

  // Add the necessary number of weeks
  startDate.add(weekNumber, 'weeks');

  return startDate.toDate();
}

/**
 * @param {string} currentYearDate
 * @returns {string}
 */
function getStartOfWeekLastYear(currentYearDate) {
  const weekNumber = getWeekNumberForYear(currentYearDate);
  const lastYear = moment(currentYearDate).clone().subtract(1, 'years').year();
  return toDateString(getStartOfWeek(weekNumber, lastYear));
}

/**
 * @param {string} dateString
 * @param {('week'|'month'|'quarter')} granularity
 * @returns {string}
 */
export function getLastYearDate(dateString, granularity) {
  if (granularity === 'week') {
    return getStartOfWeekLastYear(dateString);
  }
  return toDateString(moment(dateString).clone().subtract(1, 'years').toDate());
}
