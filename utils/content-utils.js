/**
 * The LivePreso app renders content scaled to the user's window.
 * Sometimes, we need to know what ratio the content has been rendered at.
 * eg. when using .getBoundingClientRect(), the ratio is needed to convert
 * the returned values to the "actual" dimensions.
 *
 * This function returns the ratio as a number (percentage).
 *
 * @return {Number} - eg. 0.6 = 60% zoom
 */
export function getContentRatio() {
  const $article = Bridge.Slides.getArticle();
  const article = $article[0];

  const trueWidth = $article.width();
  const trueHeight = $article.height();

  const currDimensions = article.getBoundingClientRect() || {
    width: trueWidth,
    height: trueHeight,
  };

  return currDimensions.width / trueWidth;
}

/**
 * Returns the top and left offsets of the current slide.
 * This is useful when querying current mouse position within the slide,
 * as the slide may be floating inside of a container (as it does in prep mode of the app).
 *
 * @return {Object} - { topOffset: number, leftOffset: number }
 */
export function getContentOffset() {
  const article = Bridge.Slides.getArticle()[0];
  const { top, left } = article.getBoundingClientRect() || {
    top: 0,
    left: 0,
  };

  return { top, left };
}
