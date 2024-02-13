import { useState } from 'react';

function isSlideVisible(path) {
  const [section, slide = null] = path.split('/');

  const foundSlide = window.Bridge.Slides.getSlideList().find((obj) => {
    return obj.section === section && obj.slide === slide;
  });

  if (!foundSlide) {
    throw new Error(
      `Could not find slide with path '${path}' when using useSlideVisibility()`,
    );
  }

  return foundSlide.visible;
}

/**
 * Gets and sets visibility of a particular slide
 *
 * Example:
 *
 *  const [isVisible, setVisible] = useSlideVisible("section1/slide1");
 */
export function useSlideVisible(path) {
  const [isVisible, setStateVisible] = useState(isSlideVisible(path));

  function setVisible(vis) {
    window.Bridge.Slides.updateSelections([
      {
        path: `{{deck}}/${path}`,
        visible: vis,
      },
    ]);

    // Forces a re-render by using the react state here
    setStateVisible(vis);
  }

  return [isVisible, setVisible];
}
