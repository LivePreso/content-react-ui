import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@ui/components/ui';
import { Cell } from '@ui/components/ui/Table/Cell';
import style from './ButtonsCell.module.scss';

export function ButtonsCell(props) {
  const { buttons, ...cellProps } = props;

  return (
    <Cell {...cellProps}>
      {buttons.map(({ key, className, ...buttonProps }) => {
        const buttonClasses = classNames(className, style.button);
        return <Button key={key} className={buttonClasses} {...buttonProps} />;
      })}
    </Cell>
  );
}

ButtonsCell.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.exact({
      key: PropTypes.string,
      ...Button.propTypes,
    }),
  ),
  ...Cell.propTypes,
};

ButtonsCell.defaultProps = {
  buttons: [],
  ...Cell.defaultProps,
};
