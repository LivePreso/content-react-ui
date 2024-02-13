import { isFinite, isNaN, isNumber } from 'lodash-es';

export function findMinMax(array, property) {
  if (!array || array.length === 0) {
    return { min: 0, max: 0 };
  }

  return array.reduce(
    (acc, obj) => {
      const value = obj[property];

      acc.min = acc.min === 0 ? value : Math.min(acc.min, value);
      acc.max = acc.max === 0 ? value : Math.max(acc.max, value);

      return acc;
    },
    { min: 0, max: 0 },
  );
}

export function calculatePercent(numerator, denominator) {
  return numerator / denominator;
}

export function isValidNumber(value) {
  return isNumber(value) && isFinite(value) && !isNaN(value);
}
