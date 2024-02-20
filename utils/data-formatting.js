import { isNaN, isNull, isUndefined } from 'lodash-es';

export function isInvalidNumber(num) {
  return (
    Number.POSITIVE_INFINITY === num ||
    Number.NEGATIVE_INFINITY === num ||
    isNaN(num) ||
    isNull(num) ||
    isUndefined(num)
  );
}

export function isUpperCase(str) {
  return str === str.toUpperCase();
}

export function getPlural(string, count = 0) {
  const strLower = string.toLowerCase();
  const isSingle = count === 1;
  const isUpper = isUpperCase(string);
  let val = isSingle ? string : `${string}s`;

  // Add special case plurals here:
  if (strLower === 'child' || strLower === 'children') {
    // Slice to maintain possible starting uppercase
    const childStr = string.slice(0, 5);
    val = isSingle ? childStr : `${childStr}ren`;
  }

  return isUpper ? val.toUpperCase() : val;
}

export function posNegFactory({ pos, neg }) {
  return (value) => {
    if (isInvalidNumber(value) || Number(value) === 0) return '';
    return value > 0 ? pos : neg;
  };
}

function percentify(num, { numDecimal = 1 } = {}) {
  const number = Number(num);

  // Return - for NaN, null, Infinite or undefined
  if (isInvalidNumber(number)) {
    return '-';
  }

  return number.toLocaleString('en', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: numDecimal,
  });
}

export function percentifyFactory(options) {
  return (val) => percentify(val, options);
}

function cleanNumber(number, { numDecimal = 0 }) {
  // Return - for NaN, null, Infinite or undefined
  if (isInvalidNumber(number)) {
    return '-';
  }

  return number.toLocaleString('en', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: numDecimal,
  });
}

export function cleanNumberFactory(options) {
  return (val) => cleanNumber(val, options);
}

/*
 * Function to turn a number into a currency based on currency code provided
 * Takes as input the number to transform, number of decimal places - defaults to 0, currency code
 */
function currencify(
  num,
  { numDecimal = 0, minDecimal, maxDecimal, currency } = {},
) {
  // Return - for NaN, null, Infinite or undefined
  if (isInvalidNumber(num)) {
    return '-';
  }

  if (!currency) {
    // eslint-disable-next-line no-console
    console.warn('currencify - currency code not provided');

    return Number(num).toLocaleString('en', {
      style: 'decimal',
      minimumFractionDigits: minDecimal || numDecimal,
      maximumFractionDigits: maxDecimal || numDecimal,
    });
  }

  const returnNum = Number(num).toLocaleString('en', {
    style: 'currency',
    currency,
    minimumFractionDigits: minDecimal || numDecimal,
    maximumFractionDigits: maxDecimal || numDecimal,
  });

  return returnNum.replace('A', ''); // toLocaleString adds currency prefix 'A$'
}

export function currencifyFactory(options) {
  return (val) => {
    return currencify(val, options);
  };
}

/*
 * Function to add provided currency code as suffix to a number
 * Takes as input the number to transform, number of decimal places - defaults to 0, currency code
 */
function currencyCodify(
  num,
  { numDecimal = 0, minDecimal, maxDecimal, currency } = {},
) {
  // Return - for NaN, null, Infinite or undefined
  if (isInvalidNumber(num)) {
    return '-';
  }

  if (!currency) {
    // eslint-disable-next-line no-console
    console.warn('currencyCodify - currency code not provided');
  }

  const returnNum = Number(num).toLocaleString('en', {
    style: 'decimal',
    minimumFractionDigits: minDecimal || numDecimal,
    maximumFractionDigits: maxDecimal || numDecimal,
  });

  return `${returnNum} ${currency || ''}`;
}

export function currencyCodifyFactory(options) {
  return (val) => {
    return currencyCodify(val, options);
  };
}

export function decimalifyFactory({ maxDecimal = 0, minDecimal = 0 } = {}) {
  return (num) => {
    // Return - for NaN, null, Infinite or undefined
    if (isInvalidNumber(num)) {
      return '-';
    }

    return Number(num).toLocaleString('en', {
      style: 'decimal',
      minimumFractionDigits: minDecimal,
      maximumFractionDigits: maxDecimal,
    });
  };
}

export function arrayToObjectWithKey(array, key) {
  return array.reduce((accumulator, currentValue) => {
    accumulator[currentValue[key]] = currentValue;
    return accumulator;
  }, {});
}

export function roundOffDecimal(decimalNumber, fractionDigits = 2) {
  return Number(decimalNumber.toFixed(fractionDigits));
}

export function percentToFraction(percent) {
  return percent / 100.0;
}

export function toTwoDecimalsFloat(number) {
  return roundOffDecimal(number, 2);
}

export function toThreeDecimalsFloat(number) {
  return roundOffDecimal(number, 3);
}

export function toPercentGrowth(before, after) {
  return (after - before) / before;
}

export function capitalise(input) {
  if (typeof input === 'undefined') {
    // eslint-disable-next-line
    console.error('Capitalise input is undefined');
    return null;
  }
  let i;
  let w;
  let result = '';
  const words = input.split(' ');

  for (i = 0; i < words.length; i += 1) {
    w = words[i];
    result += w.substr(0, 1).toUpperCase() + w.substr(1);
    if (i < words.length - 1) {
      result += '';
    }
  }

  return result;
}
