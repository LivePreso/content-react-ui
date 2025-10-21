import { useCallback, useEffect, useState } from 'react';

import { debounce } from 'lodash-es';

import { useSlide } from '@livepreso/content-react';
import { getContentOffset, getContentRatio } from '../utils/content-utils';

const initialDimensions = {
  contentRatio: 1,
  topOffset: 0,
  leftOffset: 0,
};

function getContentDimensions() {
  const { top = 0, left = 0 } = getContentOffset();

  return {
    contentRatio: getContentRatio(),
    topOffset: top,
    leftOffset: left,
  };
}

/**
 * LivePreso app scales the content to fit within the user's window,
 * this function returns the current content zoom.
 *
 * @returns {Number} - content zoom as percentage as a React ref
 */
export function useContentDimensions() {
  const { isSlideReady } = useSlide();
  const [contentDimensions, setContentDimensions] = useState(initialDimensions);

  // I don't want to have to go around this rule, however when this function
  // is not using useCallback, it doesn't work... Will need to work out what
  // the correct dependency is.
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  const handleContentResize = useCallback(
    debounce(() => {
      setContentDimensions(getContentDimensions());
    }, 100),
    [],
  );

  useEffect(() => {
    if (!isSlideReady) return;

    handleContentResize();
    Bridge.Event.on('resize', handleContentResize, 'deck');

    // Similar to above, tried several methods of consolidating the
    // returns in this function, but then the use of this hook would break.
    /* eslint-disable-next-line consistent-return */
    return () => {
      Bridge.Event.off('resize', handleContentResize, 'deck');
    };
  }, [isSlideReady, handleContentResize]);

  return contentDimensions;
}
