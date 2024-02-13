import { meanBy } from 'lodash-es';
import { roundOffDecimal, toPercentGrowth } from './data-formatting';
import { isValidNumber } from './math-utils';

export function getFeedDataInRange(data, dateRange) {
  if (!data || !Array.isArray(data)) {
    throw new Error('Invalid data array');
  }

  const filteredData = data.filter((entry) => {
    const newDate = new Date(entry.bookingDate);
    return newDate >= dateRange.startDate && newDate <= dateRange.endDate;
  });

  return filteredData;
}

/**
 * Calculate average of metric for grouped data
 */
export function calculateAverageByMetric(groupedData, metricName) {
  return Object.entries(groupedData).map((entry) => {
    const [key, values] = entry;
    return {
      date: key,
      metric: meanBy(values, metricName),
    };
  });
}

export function processDataToDateDict(dateDict, metricName) {
  return dateDict && isValidNumber(dateDict[metricName])
    ? roundOffDecimal(dateDict[metricName])
    : 0;
}

export function processYoyDataToDateDict(
  dateDictCurrent,
  dateDictPrevious,
  metricName,
) {
  return dateDictPrevious &&
    dateDictPrevious[metricName] &&
    dateDictCurrent &&
    dateDictCurrent[metricName]
    ? roundOffDecimal(
        toPercentGrowth(
          roundOffDecimal(dateDictPrevious[metricName]),
          roundOffDecimal(dateDictCurrent[metricName]),
        ),
      )
    : 0;
}
