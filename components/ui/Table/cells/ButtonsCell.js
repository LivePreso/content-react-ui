import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@ui/components/ui';
import { TableCell } from '../TableCell';
import style from './ButtonsCell.module.scss';

export function ButtonsCell(props) {
  const { buttons, ...cellProps } = props;

  const wrapperClasses = classNames(style.buttonsContainer, {
    [style.alignRight]: cellProps.align === 'right',
  });

  return (
    <TableCell {...cellProps}>
      <div className={wrapperClasses}>
        {buttons.map(({ key, className, ...buttonProps }) => {
          const buttonClasses = classNames(className, style.button);
          return (
            <Button key={key} className={buttonClasses} {...buttonProps} />
          );
        })}
      </div>
    </TableCell>
  );
}

ButtonsCell.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.exact({
      key: PropTypes.string,
      ...Button.propTypes,
    }),
  ),
  ...TableCell.propTypes,
};

ButtonsCell.defaultProps = {
  buttons: [],
  ...TableCell.defaultProps,
};
