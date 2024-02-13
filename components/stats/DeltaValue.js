import React from 'react';
import PropTypes from 'prop-types';
import { isNull, isUndefined } from 'lodash-es';
import { Row, Column } from '@ui/components/layout';

import { Arrow } from '@ui/components/design/Arrow';
import classNames from 'classnames';
import style from './DeltaValue.module.scss';

export function DeltaValue(props) {
  const { primary, secondary, formatter, color, showArrow, className, theme } =
    props;
  const outputColor = color(primary);

  const themeClassName = {
    large: style.large,
  }[theme];

  return (
    <Column className={classNames(className, themeClassName)}>
      <Row justify="end" className={classNames(style.row, style.primary)}>
        {primary !== 0 && showArrow && (
          <div className={style.arrow}>
            <Arrow
              color={outputColor}
              orientation={primary < 0 ? 'down' : 'up'}
            />
          </div>
        )}
        <span style={{ color: `var(--${outputColor})` }}>
          {formatter(primary)}
        </span>
      </Row>
      {!isNull(secondary) && !isUndefined(secondary) && (
        <Row justify="end" className={style.row}>
          <span className={style.subHeader}>{secondary}</span>
        </Row>
      )}
    </Column>
  );
}

DeltaValue.propTypes = {
  formatter: PropTypes.func,
  color: PropTypes.func,
  className: PropTypes.string,
  primary: PropTypes.number,
  showArrow: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  theme: PropTypes.string,
};

DeltaValue.defaultProps = {
  formatter: (v) => v,
  color: () => 'color-text',
  className: null,
  primary: 567.34,
  secondary: null,
  showArrow: true,
  theme: '',
};
