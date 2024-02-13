import pick from 'lodash-es/pick';

/**
 * Retrieve visibility information about all content in the deck.
 */
export function useContentVisibility() {
  const keys = ['title', 'key', 'visible'];

  return window.Bridge.Slides.getSections().map((section) => {
    return {
      ...pick(section, keys),
      slides: section.slides?.map((slide) => pick(slide, keys)),
    };
  });
}
