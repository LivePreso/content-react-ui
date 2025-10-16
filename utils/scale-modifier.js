const generateMeasurementFunction = function (
  $pageContainer,
  slideWidth,
  slideHeight,
) {
  return function (values = {}) {
    // Apply modifier to top and left values
    // Allows for LivePreso rescaling
    const pageContainer =
      $pageContainer[0] && $pageContainer[0].getBoundingClientRect()
        ? $pageContainer[0].getBoundingClientRect()
        : { width: slideWidth, height: slideHeight };

    const modifier = pageContainer.width / slideWidth;

    return Object.keys(values).reduce((modifiedValues, key) => {
      const value = values[key];
      return { ...modifiedValues, [key]: value / modifier };
    }, {});
  };
};

/*  scaling modifier */
export function createScaleModifier() {
  const scaler = generateMeasurementFunction(
    Bridge.Slides.getArticle(),
    1920,
    1080,
  );
  return ({ transform }) => {
    const trans = scaler({ x: transform.x, y: transform.y });
    return {
      ...transform,
      x: trans.x,
      y: trans.y,
    };
  };
}
