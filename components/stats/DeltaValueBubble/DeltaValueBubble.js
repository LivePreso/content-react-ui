import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Arrow } from '@ui/components/design/Arrow';
import style from './DeltaValueBubble.module.scss';

export function DeltaValueBubble(props) {
  const { primary, secondary, formatter, color, showArrow, className } = props;
  const outputColor = color(primary);
  return (
    <div
      className={classNames(style.deltaValueBubble, className)}
      style={{ backgroundColor: `var(--${outputColor})` }}
    >
      {primary !== 0 && showArrow && (
        <span className={style.arrow}>
          <Arrow color="#ffffff" orientation={primary < 0 ? 'down' : 'up'} />
        </span>
      )}
      <span className={style.primary}>{formatter(primary)}</span>
      {secondary && <span className={style.subHeader}>{secondary}</span>}
    </div>
  );
}

DeltaValueBubble.propTypes = {
  formatter: PropTypes.func,
  color: PropTypes.func,
  className: PropTypes.string,
  primary: PropTypes.number,
  showArrow: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

DeltaValueBubble.defaultProps = {
  formatter: (v) => v,
  color: () => 'color-text',
  className: null,
  primary: 567.34,
  secondary: null,
  showArrow: true,
};
