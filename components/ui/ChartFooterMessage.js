import React from 'react';
import style from './ChartFooterMessage.module.scss';

export function ChartFooterMessage({ children }) {
  return <div className={style.background}>{children}</div>;
}
