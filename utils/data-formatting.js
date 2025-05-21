import { isNaN, isNull, isUndefined, isNumber } from 'lodash-es';

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

export function undefinedAsDash(value) {
  return isNull(value) || isUndefined(value) ? '-' : value;
}

export function getPlural(string, count = 0) {
  const strLower = string.toLowerCase();
  const isSingle = count === 1;
  const isUpper = isUpperCase(string);
  let val = isSingle ? string : `${string}s`;

  // TODO: replace me with a library!
  // Add special case plurals here:
  if (strLower === 'child' || strLower === 'children') {
    // Slice to maintain possible starting uppercase
    const childStr = string.slice(0, 5);
    val = isSingle ? childStr : `${childStr}ren`;
  }

  if (strLower === 'policy' || strLower === 'policies') {
    // Slice to maintain possible starting uppercase
    const childStr = string.slice(0, 5);
    val = isSingle ? `${childStr}y` : `${childStr}ies`;
  }

  return isUpper ? val.toUpperCase() : val;
}

export function posNegFactory({ pos, neg }) {
  return (value) => {
    if (isInvalidNumber(value) || Number(value) === 0) return '';
    return value > 0 ? pos : neg;
  };
}

function percentify(num, { numDecimal = 0, minDecimal, maxDecimal } = {}) {
  // Return - for NaN, null, Infinite or undefined
  if (isInvalidNumber(num)) {
    return '-';
  }

  const number = Number(num);

  return number.toLocaleString('en', {
    style: 'percent',
    minimumFractionDigits: minDecimal || numDecimal,
    maximumFractionDigits: maxDecimal || numDecimal,
  });
}

export function percentifyFactory(options) {
  return (val) => percentify(val, options);
}

function cleanNumber(number, { numDecimal = 0, minDecimal, maxDecimal }) {
  // Return - for NaN, null, Infinite or undefined
  if (isInvalidNumber(number)) {
    return '-';
  }

  return number.toLocaleString('en', {
    style: 'decimal',
    minimumFractionDigits: minDecimal || numDecimal,
    maximumFractionDigits: maxDecimal || numDecimal,
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
  { numDecimal = 0, minDecimal, maxDecimal, currencyCode } = {},
) {
  // Return - for NaN, null, Infinite or undefined
  if (isInvalidNumber(num)) {
    return '-';
  }

  if (!currencyCode) {
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
    currency: currencyCode,
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

/**
 * Rounds a decimal number to a specified number of fraction digits.
 *
 * @param {number} decimalNumber - The decimal number to be rounded.
 * @param {number} [fractionDigits=2] - The number of digits after the decimal point. Defaults to 2.
 * @returns {number} The rounded number with the specified number of fraction digits.
 */
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

export function capitalise(input, delimiter = ' ') {
  if (typeof input === 'undefined') {
    // eslint-disable-next-line
    console.error('Capitalise input is undefined');
    return null;
  }

  const words = input.split(delimiter);

  return words
    .map((w) => w.substr(0, 1).toUpperCase() + w.substr(1))
    .join(delimiter);
}

export function slugify() {
  return function (value) {
    const str = value.toString();
    return str
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };
}

/**
 * Converts numbers into truncated strings with large number suffixes
 *
 * Example: 1,236,453 = 1m
 *
 * @param {number} value
 * @param {boolean} options.useLongName - use longhand suffix, eg. 'm' = 'million'
 * @param {boolean} options.returnArray - return array instead of string, eg. [1, 'm']
 * @param {number} options.numDecimal
 * @param {function} options.roundingFunc
 * @param {number} options.maxLength - removes decimal places if truncated value surpasses maxLength (eg. maxLength 3: 123.6K = 123K, 1,235 = 1.2K)
 * @param {string} options.currencyCode - convert to currency, supply ISO currency code (https://en.wikipedia.org/wiki/ISO_4217)
 * @returns {(string|Array)}
 */
function prettyNumberify(
  value,
  {
    useLongName = false,
    returnArray = false,
    numDecimal = 0,
    roundingFunc = Math.round,
    maxLength = null,
    currencyCode = null,
  } = {},
) {
  const invalidStr = 'Invalid Number';

  let n = value;
  let z;
  let t = '';

  const p = /^[0-9.]+$/; // NUMBER PATTERN
  let numberNames = {
    K: 'k',
    M: 'm',
    B: 'b',
    T: 't',
  }; // Default Number Representation

  if (useLongName === true) {
    numberNames = {
      K: 'thousand',
      M: 'million',
      B: 'billion',
      T: 'trillion',
    };
  }

  const decModifier = 10 ** numDecimal;

  if (isNumber(n) || n?.match(p)) {
    n = parseFloat(n);
    z = 0;

    const absN = Math.abs(n);
    if (absN >= 1000) {
      let m = 0;

      if (absN >= 1000000000000) {
        m = roundingFunc(n / (1000000000000 / decModifier));
        t = numberNames.T;
      } else if (absN >= 1000000000) {
        m = roundingFunc(n / (1000000000 / decModifier));
        t = numberNames.B;
      } else if (absN >= 1000000) {
        m = roundingFunc(n / (1000000 / decModifier));
        t = numberNames.M;
      } else if (absN >= 1000) {
        m = roundingFunc(n / (1000 / decModifier));
        t = numberNames.K;
      }

      const resultLength = m.toString().length;
      if (maxLength !== null && resultLength > maxLength) {
        const resultDiff = resultLength - maxLength;
        const newDecModifier =
          10 ** (resultDiff <= numDecimal ? numDecimal - resultDiff : 0);
        m = roundingFunc(n / (1000 / newDecModifier));
        z = m / newDecModifier;
      } else {
        // ADDS THE DECIMAL PLACE
        z = m / decModifier;
      }

      if (currencyCode)
        z = currencify(z, {
          minDecimal: 0,
          maxDecimal: numDecimal,
          currencyCode,
        });
    } else {
      // Add decimal to numbers under 1,000
      z = roundingFunc(n * decModifier) / decModifier;
      if (currencyCode) z = currencify(z, { numDecimal, currencyCode });
    }
  } else {
    z = invalidStr;
  }

  if (returnArray) {
    const theArray = [z, t];
    return theArray;
  }

  return `${z}${t}`;
}

export function prettyNumberifyFactory(options) {
  return (val) => {
    return prettyNumberify(val, options);
  };
}
