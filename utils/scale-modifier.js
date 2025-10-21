const generateMeasurementFunction = function (contentDimensions = {}) {
  const { contentRatio = 1 } = contentDimensions;

  return function (values = {}) {
    return Object.keys(values).reduce((modifiedValues, key) => {
      const value = values[key];
      return { ...modifiedValues, [key]: value / contentRatio };
    }, {});
  };
};

/**
 * Scale modifier.
 *
 * Note: A much more detailed version of this function exists
 * in the JC-2025 deck. Go there if you find yourself needing
 * additional functionality (eg. scaling modifications).
 *
 * @param {Object} contentDimensions - generated using `useContentDimensions()`, important as this hook updates on content resize.
 * @param {Number} contentDimensions.contentRatio - The ratio of the content to the window, generated using `getContentRatio()`.
 * @param {Number} contentDimensions.topOffset - The top offset of the content, generated using `getContentOffset()`.
 * @param {Number} contentDimensions.leftOffset - The left offset of the content, generated using `getContentOffset()`.
 * @returns
 */
export function createScaleModifier(contentDimensions) {
  const scaler = generateMeasurementFunction(contentDimensions);

  return ({ transform }) => {
    const trans = scaler({ x: transform.x, y: transform.y });
    return {
      ...transform,
      x: trans.x,
      y: trans.y,
    };
  };
}
