import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell } from '../TableCell';
import style from './ImageCell.module.scss';

export function ImageCell(props) {
  const { label, imageStyle, ...cellProps } = props;

  const imageClasses = classNames(imageStyle, style.image);

  return (
    <TableCell {...cellProps}>
      {label && (
        <h5>
          <strong>{label}</strong>
        </h5>
      )}
      <div className={imageClasses} />
    </TableCell>
  );
}

ImageCell.propTypes = {
  label: PropTypes.string,
  imageStyle: PropTypes.string.isRequired,
  ...TableCell.propTypes,
};

ImageCell.defaultProps = {
  label: null,
  ...TableCell.defaultProps,
};
