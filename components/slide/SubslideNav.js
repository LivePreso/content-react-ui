import React from 'react';
import { useSubslides } from '@livepreso/content-react';
import style from './SubslideNav.module.scss';

export function SubslideNav() {
  const { atTop, atBottom, navigateUp, navigateDown, animating } =
    useSubslides();

  const isAnimating = animating.up || animating.down;

  return (
    <div className={style.nav}>
      <button
        type="button"
        className={style.button}
        onClick={() => navigateUp()}
        disabled={isAnimating || atTop}
      >
        UP
      </button>
      <button
        type="button"
        className={style.button}
        onClick={() => navigateDown()}
        disabled={isAnimating || atBottom}
      >
        DOWN
      </button>
    </div>
  );
}
