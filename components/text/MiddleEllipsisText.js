import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Nbsp } from '@ui/components/text/Nbsp';
import style from './MiddleEllipsisText.module.scss';

export function MiddleEllipsisText(props) {
  const { children, minAfter, className } = props;

  const words = children.split(' ');
  let after = words.length > 1 ? words.pop() : null;
  let before = words.join(' ');

  if (!after && before > minAfter) {
    before = children.slice(0, -minAfter);
    after = children.slice(-minAfter);
  }

  return (
    <div className={classNames(className, style.wrapper)}>
      <span className={style.beforeEllipsis}>
        {before}
        <Nbsp />
      </span>
      <span className={style.afterEllipsis}>{after}</span>
    </div>
  );
}

MiddleEllipsisText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minAfter: PropTypes.number,
  className: PropTypes.string,
};

MiddleEllipsisText.defaultProps = {
  children: '',
  minAfter: 5,
  className: null,
};
