import PropTypes from 'prop-types';
import React, { useRef, useContext } from 'react';
import classNames from 'classnames';
import style from './SlideWrapper.module.scss';
import { BrandingContext } from '../../contexts/branding';
import { SlideOverlayRefContext } from '../../contexts/slide-overlay-ref';

export function SlideWrapper({ children }) {
  const ref = useRef(null);
  const { className: brandingClassName, cssVariables } =
    useContext(BrandingContext);

  return (
    <SlideOverlayRefContext.Provider value={ref}>
      <div
        className={classNames(brandingClassName, style.slideWrapper)}
        style={cssVariables}
      >
        {children}

        <div ref={ref} className={style.slideOverlayLayer} />
      </div>
    </SlideOverlayRefContext.Provider>
  );
}

SlideWrapper.propTypes = {
  children: PropTypes.node,
};

SlideWrapper.defaultProps = {
  children: null,
};
