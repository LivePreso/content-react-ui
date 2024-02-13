import { useState } from 'react';

function getSection(sectionKey) {
  const section = window.Bridge.Slides.getSections().find((obj) => {
    return obj.key === sectionKey;
  });
  return section || null;
}

function isSectionVisible(sectionKey) {
  const foundSection = getSection(sectionKey);

  if (!foundSection) {
    throw new Error(
      `Could not find section with key '${sectionKey}' when using useSlideVisibility()`,
    );
  }

  const visibleSlides = [foundSection.visible].concat(
    foundSection.slides.map((slide) => slide.visible),
  );

  return visibleSlides.some(Boolean);
}

/**
 * Gets and sets visibility of a particular section. If any slide or section is visible
 * within that section, the whole thing is considered "visible".
 *
 * Calling setVisible will turn all of the section with its slides on or off.
 *
 * Example:
 *
 *  const [isVisible, setVisible] = useSectionVisible("section1");
 */
export function useSectionVisible(sectionKey) {
  const [isVisible, setStateVisible] = useState(isSectionVisible(sectionKey));

  function setVisible(vis) {
    const section = getSection(sectionKey);

    const keys = [sectionKey].concat(
      section.slides.map((slide) => `${sectionKey}/${slide.key}`),
    );

    window.Bridge.Slides.updateSelections(
      keys.map((key) => {
        return { path: `{{deck}}/${key}`, visible: vis };
      }),
    );

    setStateVisible(vis);
  }

  return [isVisible, setVisible];
}
